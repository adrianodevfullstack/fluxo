import { NAVEGACAO } from "@/data/navegacao";
import Link from "next/link";

const LINKS_RODAPE = NAVEGACAO.filter((link) => link.href !== "/");

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-zinc-700">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-marca text-xs font-bold text-white"
          >
            F
          </span>
          Fluxo
        </div>
        <p>
          © {new Date().getFullYear()} Fluxo. Projeto fictício criado para fins
          didáticos.
        </p>
        <nav aria-label="Rodapé">
          <ul className="flex gap-6">
            {LINKS_RODAPE.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-marca"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
