"use client";

import clsx from "clsx";
import { useState } from "react";
import { useFavoritos } from "../context/FavoritosContext";

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
});

const PERIODOS = [
  { valor: "mensal", rotulo: "Mensal" },
  { valor: "anual", rotulo: "Anual", selo: "-20%" },
];

export default function Planos({ planos }) {
  const [periodo, setPeriodo] = useState("mensal");
  const anual = periodo === "anual";
  const { estaFavoritado, alternar } = useFavoritos();

  return (
    <div>
      <div
        role="group"
        aria-label="Período de cobrança"
        className="mx-auto flex w-fit items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 text-sm font-medium"
      >
        {PERIODOS.map((opcao) => {
          const selecionado = periodo === opcao.valor;

          return (
            <button
              key={opcao.valor}
              type="button"
              aria-pressed={selecionado}
              onClick={() => setPeriodo(opcao.valor)}
              className={clsx(
                "flex items-center gap-2 rounded-full px-5 py-2 transition-colors",
                selecionado
                  ? "bg-marca text-white"
                  : "text-zinc-600 hover:text-marca",
              )}
            >
              {opcao.rotulo}
              {opcao.selo && (
                <span
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    selecionado
                      ? "bg-white/20 text-white"
                      : "bg-marca-clara text-marca-escura",
                  )}
                >
                  {opcao.selo}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {planos.map((plano) => {
          const preco = anual ? plano.precoAnual : plano.precoMensal;
          const favoritado = estaFavoritado(plano.id);

          return (
            <li
              key={plano.nome}
              className={clsx(
                "relative flex flex-col rounded-2xl border p-8 transition-all hover:-translate-y-1",
                plano.destaque
                  ? "border-marca bg-marca-escura text-white shadow-xl shadow-marca/30"
                  : "border-zinc-100 bg-white hover:shadow-lg hover:shadow-marca/5",
              )}
            >
              {plano.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-marca-escura shadow">
                  Mais popular
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{plano.nome}</h3>

              <button
                type="button"
                onClick={() => alternar(plano.id)}
                aria-pressed={favoritado}
              >
                {favoritado ? "★" : "☆"}
              </button>

              <p
                className={clsx(
                  "mt-1 text-sm",
                  plano.destaque ? "text-white/70" : "text-zinc-500",
                )}
              >
                {plano.descricao}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">
                  {formatadorMoeda.format(preco)}
                </span>
                <span
                  className={plano.destaque ? "text-white/70" : "text-zinc-500"}
                >
                  /mês
                </span>
              </div>
              {anual && (
                <p
                  className={clsx(
                    "mt-1 text-xs",
                    plano.destaque ? "text-white/60" : "text-zinc-500",
                  )}
                >
                  cobrado anualmente
                </p>
              )}

              <ul className="mt-8 flex flex-col gap-3 text-sm">
                {plano.recursos.map((recurso) => (
                  <li key={recurso} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className={plano.destaque ? "text-white" : "text-marca"}
                    >
                      ✓
                    </span>
                    {recurso}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={clsx(
                  "mt-10 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                  plano.destaque
                    ? "bg-white text-marca-escura hover:bg-zinc-100"
                    : "bg-marca text-white hover:bg-marca-escura",
                )}
              >
                Escolher {plano.nome}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
