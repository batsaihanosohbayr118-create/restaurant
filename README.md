# VELORA — Fine Dining Restaurant Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide React дээр бүтээсэн premium ресторан вэбсайт.

## Ажиллуулах заавар / Getting started

```bash
npm install
npm run dev
```

Дараа нь `http://localhost:3000` хаягаар нээнэ.

Production build:

```bash
npm run build
npm run start
```

## Folder Structure

```
vayora/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Global styles
│   └── menu/
│       └── page.tsx        # Full menu page with category filter
├── components/
│   ├── Header.tsx           # Sticky/transparent nav + mobile menu
│   ├── Hero.tsx              # Cinematic hero section
│   ├── About.tsx             # Our story section
│   ├── SignatureMenu.tsx     # Signature dish cards
│   ├── MenuFilter.tsx        # Interactive category filter (client)
│   ├── Gallery.tsx           # Masonry gallery + lightbox trigger
│   ├── Lightbox.tsx          # Fullscreen image viewer
│   ├── Reviews.tsx           # Horizontal review carousel
│   ├── Reservation.tsx       # Booking form + confirmation state
│   ├── Contact.tsx           # Contact details + map placeholder
│   ├── Footer.tsx            # Site footer
│   └── Reveal.tsx            # Scroll-reveal animation wrapper
├── lib/
│   └── data.ts               # Menu items, gallery images, reviews
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Notes

- Зургууд Unsplash-аас `next/image` remote pattern ашиглан ачаалагдана (`next.config.mjs`). Өөрийн зургаа ашиглахыг хүсвэл `lib/data.ts` болон компонент доторх `src` замуудыг солино уу.
- Reservation форм одоогоор зөвхөн frontend талд симуляц хийдэг (backend холболтгүй). API/имэйл үйлчилгээтэй холбохын тулд `components/Reservation.tsx` доторх `handleSubmit`-г засварлана уу.
- Google Maps-ийг идэвхжүүлэхийн тулд `components/Contact.tsx` доторх placeholder блокийг өөрийн embed iframe-ээр солино уу.
- Фонт: тавцан дээр `Cormorant Garamond` (гарчиг) болон `Karla` (энгийн текст) `next/font/google`-оор ачаалагдана — интернэт холболтгүй орчинд эхний удаа build хийхэд Google Fonts-д хандах шаардлагатай.
