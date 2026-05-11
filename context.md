# Chá de Panela — Landing Page

Landing page única e scrollável para evento de Chá de Panela / Casa Nova. Stack: Next.js 15, TypeScript, TailwindCSS, Vercel.

## Objetivo

Site de uma página onde convidados podem ver informações do evento, confirmar presença via WhatsApp, visualizar lista de presentes com cards e fazer PIX. Sem backend complexo, sem autenticação, sem painel admin.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS 3** com tema customizado (sage, terracotta, cream)
- **Componentes UI próprios** (Button, Card) seguindo padrão shadcn/ui
- **Fontes Google**: Playfair Display (títulos) + Lora (corpo)
- **cheerio** para scraping server-side de produtos
- **qrcode.react** para QR Code PIX
- **framer-motion** disponível mas não usado (animações via CSS + Intersection Observer)

## Arquitetura

```
app/
├── layout.tsx          # Metadata + fontes
├── page.tsx            # Monta as 6 seções com ScrollReveal
├── globals.css         # Tailwind + CSS variables do tema
└── api/
    ├── gifts/route.ts      # GET: lê gifts.json, faz scrape, merge com fallback manual
    └── scrape-product/route.ts  # GET?url=: scrape produto único

components/
├── ui/button.tsx, card.tsx    # Componentes base shadcn-style
├── hero-section.tsx            # Capa principal (server component)
├── event-info.tsx              # Data, endereço, mapa (server)
├── confirmation-section.tsx    # Botão WhatsApp (client)
├── gifts-section.tsx           # Grid + loading skeletons (client)
├── gift-card.tsx               # Card individual (client)
├── pix-section.tsx             # QR Code + copiar (client)
└── scroll-reveal.tsx           # Wrapper de fade-in no scroll (client)

data/
└── gifts.json  # Array de { url, title?, image?, price? }

lib/
├── scraper.ts   # Lógica de extração: JSON-LD → OG → meta tags
└── utils.ts     # cn() helper
```

## Sistema de presentes

O scraping tenta extrair dados automaticamente dos links de produto (Amazon, Mercado Livre, Magalu), mas **e-commerces grandes bloqueiam IPs serverless**. Por isso, o `gifts.json` aceita dados manuais como fallback:

```json
{
  "url": "https://www.amazon.com.br/dp/ASIN",
  "title": "Nome manual do produto",
  "image": "https://url-da-imagem.jpg",
  "price": 199.90
}
```

A API `/api/gifts` faz merge: dados do scraping preenchem o que conseguir, dados manuais do JSON sobrescrevem campos vazios. O card sempre renderiza com "Preço a consultar" se não houver preço, e placeholder se não houver imagem.

## Funcionalidades

- **Confirmação de presença**: botão que abre WhatsApp com mensagem pré-preenchida (zero persistência)
- **QR Code PIX**: renderizado client-side, botão copia PIX usa Clipboard API
- **Animações**: Intersection Observer com classes Tailwind (fade-in + slide-up)
- **Loading states**: skeleton cards enquanto a API de presentes carrega

## Variáveis de ambiente (.env)

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_COUPLE_NAME` | Nome do casal no hero |
| `NEXT_PUBLIC_EVENT_DATE` | Data do evento |
| `NEXT_PUBLIC_EVENT_TIME` | Horário |
| `NEXT_PUBLIC_EVENT_ADDRESS` | Endereço completo |
| `NEXT_PUBLIC_MAPS_LINK` | Link do Google Maps |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | DDI+DDD+número (ex: 5511999999999) |
| `NEXT_PUBLIC_PIX_KEY` | Chave PIX completa |

## Comandos

```bash
npm run dev    # Dev server em localhost:3000
npm run build  # Build de produção
npm run start  # Rodar build de produção
```

## Deploy (Vercel)

1. Conectar repo no dashboard da Vercel
2. Configurar as env vars listadas acima
3. Deploy automático na branch main

Sem necessidade de configurar banco de dados, storage ou serviços externos.

## Limitações aceitas (MVP)

- Scraping pode falhar em sites com anti-bot agressivo → fallback manual no JSON
- Confirmação de presença não persiste → WhatsApp é o canal de registro
- Sem painel admin → editar `gifts.json` diretamente para gerenciar presentes
- Sem analytics / tracking
