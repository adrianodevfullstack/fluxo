"use client";

import BotaoLink from "@/components/BotaoLink";
import { NAVEGACAO } from "@/data/navegacao";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavoritos } from "../context/FavoritosContext";

export default function Navbar() {
  const caminhoAtual = usePathname();
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const { total: totalFavoritos } = useFavoritos();

  useEffect(() => {
    function verificarRolagem() {
      setRolou(window.scrollY > 12);
    }

    verificarRolagem();
    window.addEventListener("scroll", verificarRolagem, { passive: true });
    return () => window.removeEventListener("scroll", verificarRolagem);
  }, []);

  useEffect(() => {
    if (!menuAberto) return;

    function aoPressionarTecla(evento) {
      if (evento.key === "Escape") setMenuAberto(false);
    }

    window.addEventListener("keydown", aoPressionarTecla);
    return () => window.removeEventListener("keydown", aoPressionarTecla);
  }, [menuAberto]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        rolou
          ? "bg-white/90 shadow-md backdrop-blur-sm"
          : "bg-transparent shadow-none",
      )}
    >
      <nav aria-label="Principal">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-marca-escura"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-marca text-sm font-bold text-white"
            >
              F
            </span>
            Fluxo
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAVEGACAO.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={caminhoAtual === link.href ? "page" : undefined}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-marca",
                    caminhoAtual === link.href ? "text-marca" : "text-zinc-600",
                  )}
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/precos">
            ★{totalFavoritos > 0 && <span>{totalFavoritos}</span>}
          </Link>

          <div className="hidden md:block">
            <BotaoLink href="/contato" variante="compacto" tamanho="pequeno">
              Começar agora
            </BotaoLink>
          </div>

          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-movel"
            onClick={() => setMenuAberto((valor) => !valor)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={clsx(
                "h-0.5 w-6 bg-zinc-800 transition-transform duration-300",
                menuAberto && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-6 bg-zinc-800 transition-opacity duration-300",
                menuAberto ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-6 bg-zinc-800 transition-transform duration-300",
                menuAberto && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>

        <div
          id="menu-movel"
          inert={!menuAberto}
          className={clsx(
            "grid transition-[grid-template-rows] duration-300 md:hidden",
            menuAberto
              ? "grid-rows-[1fr] border-t border-zinc-100"
              : "grid-rows-[0fr]",
          )}
        >
          <ul className="flex min-h-0 flex-col gap-1 overflow-hidden bg-white px-6">
            {NAVEGACAO.map((link, posicao) => (
              <li
                key={link.href}
                className={clsx(
                  posicao === 0 && "pt-4",
                  posicao === NAVEGACAO.length - 1 && "pb-4",
                )}
              >
                <Link
                  href={link.href}
                  aria-current={caminhoAtual === link.href ? "page" : undefined}
                  onClick={() => setMenuAberto(false)}
                  className={clsx(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-marca-clara hover:text-marca-escura",
                    caminhoAtual === link.href
                      ? "bg-marca-clara text-marca-escura"
                      : "text-zinc-600",
                  )}
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
