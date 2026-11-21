"use client";

// Mesmo padrão de busca de dados da aula anterior (useEffect +
// .then()/.catch() + cancelado + tentativa) — a diferença aqui é que
// /api/painel/resumo é uma rota do PRÓPRIO Next.js (não da fluxo-api),
// então não precisa de NEXT_PUBLIC_API_URL nem passa por CORS: é uma
// chamada de mesma origem, com o cookie de sessão enviado automaticamente
// pelo navegador.
import { useEffect, useState } from "react";
import EstadoCarregamento from "./EstadoCarregamento";
import EstadoErro from "./EstadoErro";

export default function ResumoPainel() {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    fetch("/api/painel/resumo")
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Falha ao buscar resumo");
        return resposta.json();
      })
      .then((dados) => {
        if (!cancelado) setResumo(dados);
      })
      .catch(() => {
        if (!cancelado) setErro(true);
      });

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setErro(false);
    setResumo(null);
    setTentativa((valor) => valor + 1);
  }

  if (erro) return <EstadoErro aoTentarNovamente={tentarNovamente} />;
  if (!resumo) return <EstadoCarregamento texto="Carregando resumo..." />;

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-zinc-200 p-6">
        <p className="text-sm text-zinc-500">Fluxos ativos</p>
        <p className="mt-1 text-3xl font-bold text-zinc-900">
          {resumo.fluxosAtivos}
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-200 p-6">
        <p className="text-sm text-zinc-500">Execuções hoje</p>
        <p className="mt-1 text-3xl font-bold text-zinc-900">
          {resumo.execucoesHoje}
        </p>
      </div>
    </div>
  );
}
