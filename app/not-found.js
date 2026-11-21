import BotaoLink from "@/components/BotaoLink";

export const metadata = {
  title: "Página não encontrada",
};

export default function NaoEncontrado() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl font-bold text-marca">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-zinc-900">
        Página não encontrada
      </h1>
      <p className="mt-4 text-zinc-600">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <BotaoLink href="/" className="mt-8">
        Voltar para o início
      </BotaoLink>
    </section>
  );
}
