import FormularioContato from "@/components/FormularioContato";
import Revelar from "@/components/Revelar";

export const metadata = {
  title: "Contato",
  description: "Fale com o time do Fluxo.",
  alternates: { canonical: "/contato" },
};

export default function Contato() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Revelar>
          <h1 className="font-display text-4xl font-bold text-zinc-900 sm:text-5xl">
            Vamos conversar sobre o seu fluxo
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Preencha o formulário e alguém do nosso time entra em contato em até
            1 dia útil.
          </p>
          <dl className="mt-10 flex flex-col gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-3">
              <dt className="font-semibold text-zinc-900">E-mail</dt>
              <dd>contato@fluxo.exemplo</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="font-semibold text-zinc-900">Chat</dt>
              <dd>Disponível em dias úteis, das 9h às 18h</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="font-semibold text-zinc-900">Endereço</dt>
              <dd>Av. Fictícia, 1000 — São Paulo, SP</dd>
            </div>
          </dl>
        </Revelar>

        <Revelar atrasoMs={100}>
          <FormularioContato />
        </Revelar>
      </div>
    </section>
  );
}
