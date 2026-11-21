"use client";

import { useActionState } from "react";
import { autenticar } from "./actions";

export default function Login() {
  const [erro, acao, pendente] = useActionState(autenticar, undefined);

  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-24">
      <h1 className="font-display text-3xl font-bold text-zinc-900">Entrar</h1>
      <p className="mt-2 text-zinc-600">
        Acesse o painel do Fluxo com sua conta.
      </p>

      <form action={acao} className="mt-8 flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-marca"
          />
        </div>

        <div>
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-zinc-700"
          >
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-marca"
          />
        </div>

        {erro && <p className="text-sm text-red-600">{erro}</p>}

        <button
          disabled={pendente}
          type="submit"
          className="rounded-full bg-marca px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-marca-escura disabled:opacity-60"
        >
          {pendente ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
        Para testar: <strong>ana@fluxo.exemplo</strong> /{" "}
        <strong>fluxo123</strong>
      </p>
    </section>
  );
}
