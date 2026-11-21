"use client";

import { enviarContato } from "@/app/contato/actions";
import { ESTADO_INICIAL_CONTATO, LIMITES_CONTATO } from "@/lib/contato";
import clsx from "clsx";
import { useActionState, useEffect, useRef, useState } from "react";

const CLASSE_CAMPO =
  "mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm outline-hidden transition-colors focus:border-marca focus:ring-2 focus:ring-marca/20";

function Campo({
  id,
  rotulo,
  opcional = false,
  erro,
  multilinha = false,
  ...props
}) {
  const Controle = multilinha ? "textarea" : "input";
  const idErro = `${id}-erro`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {rotulo}
        {opcional && <span className="text-zinc-500"> (opcional)</span>}
      </label>
      <Controle
        id={id}
        name={id}
        maxLength={LIMITES_CONTATO[id]}
        aria-invalid={erro ? "true" : undefined}
        aria-describedby={erro ? idErro : undefined}
        className={clsx(
          CLASSE_CAMPO,
          erro ? "border-red-500" : "border-zinc-200",
        )}
        {...props}
      />
      {erro && (
        <p id={idErro} className="mt-1 text-xs text-red-600">
          {erro}
        </p>
      )}
    </div>
  );
}

function Formulario({ aoEnviarOutra }) {
  const [estado, acao, enviando] = useActionState(
    enviarContato,
    ESTADO_INICIAL_CONTATO,
  );
  const referenciaFormulario = useRef(null);

  useEffect(() => {
    if (estado.status !== "erro") return;
    referenciaFormulario.current
      ?.querySelector('[aria-invalid="true"]')
      ?.focus();
  }, [estado]);

  if (estado.status === "sucesso") {
    return (
      <div
        role="status"
        className="animar-entrar rounded-2xl border border-emerald-100 bg-emerald-50 p-10 text-center"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white"
        >
          ✓
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-emerald-900">
          Mensagem enviada!
        </h3>
        <p className="mt-2 text-sm text-emerald-700">
          Alguém do nosso time vai responder em até 1 dia útil.
        </p>
        <button
          type="button"
          onClick={aoEnviarOutra}
          className="mt-6 rounded-full border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const { valores, erros, erroGeral } = estado;

  return (
    <form
      ref={referenciaFormulario}
      action={acao}
      noValidate
      aria-busy={enviando}
      className="flex flex-col gap-5 rounded-2xl border border-zinc-100 bg-white p-8"
    >
      <Campo
        id="nome"
        rotulo="Nome"
        type="text"
        autoComplete="name"
        placeholder="Seu nome completo"
        defaultValue={valores.nome}
        erro={erros.nome}
      />

      <Campo
        id="email"
        rotulo="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@empresa.com"
        defaultValue={valores.email}
        erro={erros.email}
      />

      <Campo
        id="empresa"
        rotulo="Empresa"
        opcional
        type="text"
        autoComplete="organization"
        placeholder="Nome da sua empresa"
        defaultValue={valores.empresa}
        erro={erros.empresa}
      />

      <Campo
        id="mensagem"
        rotulo="Mensagem"
        multilinha
        rows={4}
        placeholder="Conte o que você precisa automatizar"
        defaultValue={valores.mensagem}
        erro={erros.mensagem}
      />

      {erroGeral && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {erroGeral}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-marca px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marca-escura disabled:cursor-not-allowed disabled:opacity-70"
      >
        {enviando && (
          <span
            aria-hidden="true"
            className="animar-girar h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {enviando ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}

export default function FormularioContato() {
  const [tentativa, setTentativa] = useState(0);

  return (
    <Formulario
      key={tentativa}
      aoEnviarOutra={() => setTentativa((valor) => valor + 1)}
    />
  );
}
