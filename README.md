# Fluxo — landing page (aplicação da atividade guiada)

Aplicação completa e funcional construída seguindo, passo a passo, a atividade
**"Interfaces visuais com Next.js: construindo uma landing page interativa"**
(`Aula_NextJS_Visual_Atividade_Laboratorio.docx`). Todo código condicional de
`className` usa [clsx](https://github.com/lukeed/clsx).

Fluxo é um produto fictício, criado só para fins didáticos.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Não há backend nem variáveis de ambiente obrigatórias — os dados (planos,
depoimentos, perguntas frequentes) ficam em `data/`. Opcionalmente, defina
`SITE_URL` (veja `.env.example`) para gerar URLs corretas em metadados,
sitemap e robots.

## Estrutura

```
app/
  layout.js               // fonte (next/font), metadados base, Navbar + Footer
  page.js                  // Início: hero, funcionalidades, depoimentos
  precos/page.js            // Planos (mensal/anual) + FAQ
  contato/page.js           // Página de contato
  contato/actions.js         // Server Action: validação + envio (simulado)
  error.js / not-found.js     // telas de erro e 404
  robots.js / sitemap.js       // SEO
  globals.css                   // tema Tailwind (@theme) + animações
components/                      // Server Components, exceto os marcados
  BotaoLink.jsx                   // link com aparência de botão (variantes)
  FluxogramaHero.jsx               // mockup decorativo do hero
  Footer.jsx
  Navbar.jsx                        // Client — rolagem, menu mobile, link ativo
  Revelar.jsx                        // Client — fade-in ao rolar (IntersectionObserver)
  Depoimentos.jsx                     // Client — carrossel (pausa ao interagir)
  Planos.jsx                           // Client — toggle mensal/anual
  Acordeon.jsx                          // Client — FAQ acessível
  FormularioContato.jsx                  // Client — useActionState + Server Action
data/                                      // conteúdo estático (planos, depoimentos…)
lib/                                        // regras compartilhadas (contato, site)
```

Importações usam o alias `@/` (ex.: `@/components/Navbar`).

## Scripts

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — serve o build de produção
- `npm run lint` — ESLint
