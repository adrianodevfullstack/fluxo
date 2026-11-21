import Acordeon from "@/components/Acordeon";
import Planos from "@/components/Planos";
import Revelar from "@/components/Revelar";
import { buscarApi } from "@/lib/api";

export const metadata = {
  title: "Preços",
  description: "Planos do Fluxo para equipes de todos os tamanhos.",
  alternates: { canonical: "/precos" },
};

export default async function Precos() {
  const [planos, perguntas] = await Promise.all([
    buscarApi("/api/planos"),
    buscarApi("/api/perguntas"),
  ]);

  return (
    <>
      <section className="bg-linear-to-b from-marca-clara to-white px-6 py-20 text-center">
        <Revelar>
          <h1 className="font-display text-4xl font-bold text-zinc-900 sm:text-5xl">
            Planos para cada tamanho de equipe
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
            Comece gratuitamente por 14 dias. Cancele quando quiser.
          </p>
        </Revelar>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Revelar>
          <Planos planos={planos} />
        </Revelar>
      </section>

      <section className="bg-zinc-50 px-6 py-24">
        <Revelar className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-zinc-900">
            Perguntas frequentes
          </h2>
        </Revelar>

        <div className="mt-12">
          <Revelar>
            <Acordeon perguntas={perguntas} />
          </Revelar>
        </div>
      </section>
    </>
  );
}
