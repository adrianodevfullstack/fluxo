import clsx from "clsx";
import Link from "next/link";

const BASE = "inline-block rounded-full font-semibold";

const VARIANTES = {
  primario:
    "bg-marca text-white shadow-lg shadow-marca/30 transition-all hover:-translate-y-0.5 hover:bg-marca-escura",
  secundario:
    "border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-marca hover:text-marca",
  compacto: "bg-marca text-white transition-colors hover:bg-marca-escura",
};

const TAMANHOS = {
  grande: "px-8 py-3.5 text-base",
  pequeno: "px-5 py-2 text-sm",
};

export default function BotaoLink({
  href,
  variante = "primario",
  tamanho = "grande",
  className,
  children,
  ...resto
}) {
  return (
    <Link
      href={href}
      className={clsx(BASE, VARIANTES[variante], TAMANHOS[tamanho], className)}
      {...resto}
    >
      {children}
    </Link>
  );
}
