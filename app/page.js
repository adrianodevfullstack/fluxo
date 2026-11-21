import BotaoLink from "@/components/BotaoLink";
import Depoimentos from "@/components/Depoimentos";
import FluxogramaHero from "@/components/FluxogramaHero";
import Revelar from "@/components/Revelar";
import { FUNCIONALIDADES } from "@/data/funcionalidades";
import { buscarApi } from "@/lib/api";
import Image from "next/image";

export const metadata = {
  alternates: { canonical: "/" },
};

const CLIENTES = ["Orbita", "Nimbus", "Cedro", "Polar", "Vertice"];

export default async function Home() {
  const depoimentos = await buscarApi("/api/depoimentos");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-marca-clara to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
          <span className="animar-pulso rounded-full border border-marca/20 bg-white px-4 py-1.5 text-sm font-medium text-marca-escura">
            Novo: automações com disparo por horário{" "}
            <span aria-hidden="true">🎉</span>
          </span>

          <h1 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-tight text-zinc-900 sm:text-6xl">
            Automatize o trabalho repetitivo da sua equipe
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            O Fluxo conecta as ferramentas que você já usa e cuida das tarefas
            manuais por você — sem precisar escrever código.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BotaoLink href="/precos">Começar gratuitamente</BotaoLink>
            <BotaoLink href="/contato" variante="secundario">
              Falar com vendas
            </BotaoLink>
          </div>

          <FluxogramaHero />
          <div className="mt-12 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-6">
            {CLIENTES.map((nome) => (
              <Image
                key={nome}
                src={`/imagens/clientes/${nome.toLowerCase()}.png`}
                alt={nome}
                width={140}
                height={45}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Revelar className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Tudo que sua equipe precisa para parar de repetir tarefas
          </h2>
        </Revelar>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONALIDADES.map((item, posicao) => (
            <Revelar as="li" key={item.titulo} atrasoMs={posicao * 80}>
              <div className="h-full rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-marca/30 hover:shadow-lg hover:shadow-marca/5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-marca-clara text-xl"
                >
                  {item.icone}
                </span>
                <h3 className="mt-4 font-display font-semibold text-zinc-900">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.descricao}
                </p>
              </div>
            </Revelar>
          ))}
        </ul>
      </section>

      {/* Depoimentos */}
      <section className="bg-zinc-50 px-6 py-24">
        <Revelar className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Quem automatiza com o Fluxo não quer mais voltar
          </h2>
        </Revelar>

        <div className="mt-14">
          <Depoimentos depoimentos={depoimentos} />
        </div>
      </section>

      {/* Chamada final */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Revelar>
          <h2 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Pronto para automatizar o próximo fluxo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
            Comece gratuitamente hoje — sem compromisso.
          </p>
          <BotaoLink href="/precos" className="mt-8">
            Ver planos e preços
          </BotaoLink>
        </Revelar>
      </section>
    </>
  );
}
