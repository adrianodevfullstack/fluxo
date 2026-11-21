import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/site";
import { Inter } from "next/font/google";
import { FavoritosProvider } from "../context/FavoritosContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITULO_PADRAO = "Fluxo — Automação de fluxos de trabalho";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITULO_PADRAO,
    template: "%s — Fluxo",
  },
  description: SITE.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
  },
};

export const viewport = {
  themeColor: "#5b3df5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-dvh flex-col font-sans text-zinc-800 antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-marca-escura focus:shadow-lg"
        >
          Ir para o conteúdo
        </a>
        <FavoritosProvider>
          <Navbar />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        </FavoritosProvider>
      </body>
    </html>
  );
}
