"use client";

import clsx from "clsx";
import { useId, useState } from "react";

export default function Acordeon({ perguntas }) {
  const idBase = useId();
  const [abertoIndex, setAbertoIndex] = useState(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-zinc-100 rounded-2xl border border-zinc-100 bg-white">
      {perguntas.map((item, posicao) => {
        const estaAberto = abertoIndex === posicao;
        const idPergunta = `${idBase}-pergunta-${posicao}`;
        const idPainel = `${idBase}-painel-${posicao}`;

        return (
          <div key={item.pergunta}>
            <h3>
              <button
                type="button"
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAbertoIndex(estaAberto ? -1 : posicao)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span id={idPergunta} className="font-medium text-zinc-900">
                  {item.pergunta}
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    "flex h-6 w-6 flex-none items-center justify-center rounded-full bg-marca-clara text-marca-escura transition-transform duration-300",
                    estaAberto && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={idPainel}
              role="region"
              aria-labelledby={idPergunta}
              inert={!estaAberto}
              className={clsx(
                "grid transition-[grid-template-rows] duration-300",
                estaAberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-600">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
