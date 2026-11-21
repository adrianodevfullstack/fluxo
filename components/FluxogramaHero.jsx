import Image from "next/image";

export default function FluxogramaHero() {
  return (
    <div
      aria-hidden="true"
      className="animar-flutuar mt-16 flex h-56 w-full max-w-3xl items-center justify-center rounded-2xl border border-zinc-100 bg-white shadow-2xl shadow-marca/10 sm:h-72"
    >
      <div className="relative h-56 w-full max-w-3xl overflow-hidden rounded-2xl sm:h-72">
        <Image
          src="/imagens/hero-fluxo.png"
          alt="Fluxograma: Novo pedido leva a Gerar nota fiscal, que leva a Notificar cliente"
          fill
          priority
          sizes="(min-width: 640px) 768px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
