import { NAVEGACAO } from "@/data/navegacao";
import { SITE } from "@/lib/site";

export default function sitemap() {
  return NAVEGACAO.map((link) => ({
    url: new URL(link.href, SITE.url).toString(),
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
