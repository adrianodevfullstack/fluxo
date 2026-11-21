"use client";

import { useEffect } from "react";

export default function Erro({ error, retry }) {
  useEffect(() => {
    // Ponto de integração com um serviço de monitoramento (Sentry etc.)
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-zinc-900">
        Algo deu errado
      </h1>
      <p className="mt-4 text-zinc-600">
        Tivemos um problema inesperado ao carregar esta página. Tente
        novamente em instantes.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 rounded-full bg-marca px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-marca/30 transition-all hover:-translate-y-0.5 hover:bg-marca-escura"
      >
        Tentar novamente
      </button>
    </section>
  );
}
