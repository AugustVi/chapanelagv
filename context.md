# Chá de Panela — Landing Page

Landing page única e scrollável para evento de Chá de Panela / Casa Nova. Stack: Next.js 15, TypeScript, TailwindCSS, Vercel, Neon Postgres.

## Objetivo

Site de uma página onde convidados podem ver informações do evento, confirmar presença via WhatsApp, visualizar lista de presentes com cards, reservar presentes e fazer PIX.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS 3** com tema customizado (sage, terracotta, cream)
- **Componentes UI próprios** (Button, Card) seguindo padrão shadcn/ui
- **Fontes Google**: Raleway (títulos) + Lora (corpo)
- **cheerio** para scraping server-side de produtos
- **@neondatabase/serverless** para banco de dados PostgreSQL serverless
- **QR Code PIX** como imagem estática em `public/images/pix-qrcode.png`
- **framer-motion** disponível mas não usado (animações via CSS + Intersection Observer)

## Arquitetura

```
app/
├── layout.tsx          # Metadata, viewport + fontes
├── page.tsx            # Monta as 7 seções com ScrollReveal
├── globals.css         # Tailwind + CSS variables do tema
├── ferramentas/
│   ├── page.tsx        # Conversor de links → JSON com server action (admin tool)
│   └── actions.ts      # Server action: scrapeProduct + geração de imagem local
└── api/
    ├── gifts/route.ts      # GET: lê gifts.json, faz scrape, merge com fallback manual
    └── reservations/route.ts   # GET: lista reservas (com/sem nomes). POST: cria reserva

components/
├── ui/button.tsx, card.tsx    # Componentes base shadcn-style
├── hero-section.tsx            # Capa principal (server component)
├── event-info.tsx              # Data, endereço, mapa (server)
├── confirmation-section.tsx    # Botão WhatsApp (client)
├── gifts-section.tsx           # Grid + loading skeletons + reservas + wishlist (client)
├── gift-card.tsx               # Card individual com reserva (client)
├── reservation-modal.tsx       # Modal para informar nome ao reservar (client)
├── wishlist-fallback.tsx       # Card com link para wishlist da Amazon (server)
├── pix-section.tsx             # QR Code estático + copiar (client)
├── footer-message.tsx          # Seção "Obrigado!" com coração (server)
└── scroll-reveal.tsx           # Wrapper de fade-in no scroll (client)

data/
└── gifts.json  # Array de { url, title?, image?, price? }

lib/
├── scraper.ts   # Extração: JSON-LD → OG/meta → seletores CSS por loja (Amazon, ML, Magalu)
├── db.ts        # Camada de banco: Neon Postgres, tabela reservations
└── utils.ts     # cn() helper

public/images/gifts/  # Imagens locais de produtos (referenciadas no gifts.json)
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

O scraper também detecta a loja de origem (store) a partir do domínio da URL (`ProductInfo.store`).

## Conversor de links (ferramenta admin)

Página em `/ferramentas` para adicionar presentes rapidamente:

1. Colar URL do produto (Amazon, Mercado Livre, Magalu, Shopee)
2. Clicar "Buscar" → server action tenta extrair título, imagem e preço via scraping
3. Se o scrape funcionar, campos são preenchidos automaticamente (imagem local gerada a partir do título: `/images/gifts/nome-do-produto.jpg`)
4. Se falhar (bloqueio anti-bot), campos ficam disponíveis para preenchimento manual
5. Preview do produto com JSON formatado pronto para `gifts.json`
6. Botão "Copiar JSON" → colar no array de `data/gifts.json`

## Sistema de reservas

Reservas são persistidas no **Neon Postgres** (serverless). A tabela `reservations` é criada automaticamente:

| Coluna | Tipo |
|--------|------|
| `id` | SERIAL PRIMARY KEY |
| `gift_url` | TEXT UNIQUE NOT NULL |
| `guest_name` | TEXT NOT NULL |
| `created_at` | TIMESTAMPTZ DEFAULT NOW() |

- **POST /api/reservations**: cria reserva com `{ giftUrl, guestName }`. Retorna 409 se o presente já foi reservado (unique constraint).
- **GET /api/reservations**: lista todas as reservas. Se `RESERVATIONS_ACCESS_KEY` estiver configurada e `?key=` não for informado ou estiver incorreto, retorna apenas `{ gift_url }` (sem `guest_name`).
- **GET /api/reservations?key=VALOR**: com a chave correta, retorna dados completos com nomes dos convidados.

No frontend, o `gifts-section.tsx` busca presentes e reservas em paralelo. Cada `gift-card.tsx` mostra:
- **Não reservado**: botão "Reservar" → abre modal para informar nome
- **Reservado**: badge "Reservado por [nome]" (ou só "Reservado" se o nome não estiver disponível)

## Funcionalidades

- **Confirmação de presença**: botão que abre WhatsApp com mensagem pré-preenchida
- **Reserva de presentes**: botão "Reservar" no card → modal pede nome → POST /api/reservations → badge "Reservado por [nome]"
- **QR Code PIX**: imagem estática em `public/images/pix-qrcode.png`, botão copia PIX usa Clipboard API. Para atualizar o QR code, gere uma imagem PNG da chave PIX e substitua o arquivo.
- **Wishlist Amazon**: fallback ao final da lista de presentes com link para wishlist externa da Amazon
- **Animações**: Intersection Observer com classes Tailwind (fade-in + slide-up)
- **Loading states**: skeleton cards enquanto a API de presentes carrega (grid 2 colunas mobile, até 5 colunas desktop)

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
| `RESERVATIONS_ACCESS_KEY` | Chave de acesso para ver nomes no GET /api/reservations |
| `DATABASE_URL` | Connection string do Neon Postgres (fallback: `POSTGRES_URL`) |

## Comandos

```bash
npm run dev    # Dev server em localhost:3000
npm run build  # Build de produção
npm run start  # Rodar build de produção
```

## Deploy (Vercel)

1. Conectar repo no dashboard da Vercel
2. Configurar as env vars listadas acima (incluindo `DATABASE_URL` para o Neon)
3. Deploy automático na branch main

O banco Neon Postgres precisa estar provisionado e acessível via connection string.

## Limitações aceitas (MVP)

- Scraping pode falhar em sites com anti-bot agressivo → fallback manual no JSON
- Confirmação de presença não persiste → WhatsApp é o canal de registro
- Sem painel admin → editar `gifts.json` diretamente para gerenciar presentes; conferir reservas via GET /api/reservations?key=
- Sem analytics / tracking
- Banco Postgres serverless (Neon) — cold start no primeiro acesso após inatividade
