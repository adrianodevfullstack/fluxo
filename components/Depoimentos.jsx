"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

const INTERVALO_MS = 6000;

export default function Depoimentos({ depoimentos }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = depoimentos.length;

  function irPara(novoIndice) {
    setIndice(((novoIndice % total) + total) % total);
  }

  useEffect(() => {
    if (pausado || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const temporizador = setTimeout(
      () => setIndice((atual) => (atual + 1) % total),
      INTERVALO_MS,
    );
    return () => clearTimeout(temporizador);
  }, [indice, pausado, total]);

  const depoimentoAtual = depoimentos[indice];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      className="mx-auto max-w-2xl"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div aria-live={pausado ? "polite" : "off"}>
        <figure
          key={indice}
          className="animar-entrar rounded-2xl border border-zinc-100 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <blockquote className="text-lg leading-relaxed text-zinc-700 sm:text-xl">
            <p>“{depoimentoAtual.texto}”</p>
          </blockquote>
          <figcaption className="mt-6">
            <span className="block font-display font-semibold text-zinc-900">
              {depoimentoAtual.nome}
            </span>
            <span className="block text-sm text-zinc-500">
              {depoimentoAtual.cargo}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Depoimento anterior"
          onClick={() => irPara(indice - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-marca hover:text-marca"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="flex gap-2">
          {depoimentos.map((depoimento, posicao) => (
            <button
              key={depoimento.nome}
              type="button"
              aria-label={`Ir para o depoimento de ${depoimento.nome}`}
              aria-current={posicao === indice ? "true" : undefined}
              onClick={() => irPara(posicao)}
              className={clsx(
                "relative h-2 rounded-full transition-all before:absolute before:-inset-2 before:content-['']",
                posicao === indice ? "w-6 bg-marca" : "w-2 bg-zinc-300",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Próximo depoimento"
          onClick={() => irPara(indice + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-marca hover:text-marca"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
