# Max Gadgets website

A five-page Next.js (App Router), TypeScript and Tailwind CSS v4 website for Max Gadgets, Block A, Shop 13, Fayose Market, Ado-Ekiti.

Pages: Home, Shop iPhones and bulk orders, Repairs and work, About, Reviews and contact.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks (all pass with no errors):

```bash
npm test           # form validation tests
npm run check:links  # with the site running: finds broken links, anchors and images
```

The full pre- and post-launch checklist is in `docs/LAUNCH.md`.

Checks continued:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
```

Copy `.env.example` to `.env.local` and fill it in before deploying (on Vercel, add the same values under Project Settings, Environment Variables).

## Enquiry emails

Every form (general, iPhone, bulk, repair) posts to `/api/enquiry`. The server then:

1. Emails the full details to the shop (`ENQUIRY_TO`, default `Surprisemax123@gmail.com`). The customer's email is set as Reply-To, and the email has a one-tap WhatsApp link to the customer.
2. Emails the customer a copy of what they sent, if they gave an email address.
3. Shows the customer a "Continue on WhatsApp" button with the same details prefilled.

Gmail setup: turn on 2-Step Verification for the shop Gmail, create an App Password (Google Account, Security, App passwords), then set `GMAIL_USER` and `GMAIL_APP_PASSWORD`. Gmail allows roughly 500 sent emails a day, which is plenty here. If email is not set up, the form tells the visitor and offers WhatsApp instead.

Spam protection: a hidden honeypot field, server-side validation and a simple rate limit (5 per 10 minutes per visitor).

WhatsApp: the browser opens WhatsApp with the message ready to send. Fully automatic WhatsApp delivery to the shop would need the WhatsApp Business Cloud API, which is not included.

## Where to edit things

All business content lives in `src/data`. You rarely need to touch components.

| File | What it controls |
| --- | --- |
| `business.ts` | Name, address, phone numbers, email, map links, navigation |
| `models.ts` | The iPhone list (18 Pro Max down to 12). Add `condition: "UK-used"` to show the 7-day warranty label, and `storage` to show storage. |
| `services.ts` | Repair and shop services shown on flip cards |
| `problems.ts` | The "Phone wahala? Try this first" tips |
| `faqs.ts` | FAQs and the short iPhone history |
| `guides.ts` | Buying tips, care tips, the repair glossary and the "inside your iPhone" layers |
| `photos.ts` | Registered photos. Drop a file in `public/images` and add an entry. |
| `reviews.ts` | Genuine customer reviews and customer photos. Empty lists hide those sections. |

WhatsApp messages are built in `src/lib/whatsapp.ts`. Every enquiry opens WhatsApp with a prefilled message.

## Rules built into the site

- No prices are shown. Prices change daily and are confirmed on WhatsApp (explained on the site).
- The 7-day warranty label only appears on models marked `UK-used`.
- No invented reviews, customers, stock counts or repair claims.

## Real-life photos

See `docs/PHOTOS.md`. Drop photos into `public/images/lifestyle` with the listed names and they appear on the Home and About pages.

## Customer repair journey (Home page)

The nine-step story is in `src/data/journey.ts`. Photos live in `public/images/journey` and are matched by file name (`step1_dropped_phone`, `step2_sad_at_home`, `step3_website_inquiry`, `step4_arriving_store`, `step5_store_inquiry`, `step6_phone_repair`, `step7_making_payment`, `step8_happy_customer`, `step9_playing_game`; .jpg, .png or .webp). Steps without a photo show a red-to-blue icon card, so adding `step2_sad_at_home.jpg`, `step5_store_inquiry.jpg` or `step6_phone_repair.jpg` later replaces the icon automatically after a rebuild.

## Motion

CSS 3D only, no WebGL: a rotating 3D phone, a rotating 3D ring of iPhone models, a 3D text rotator, an exploded 3D view of the inside of an iPhone, tilt-on-hover cards, 3D flip service cards, parallax photos, scroll reveals, a scrolling strip, a scroll progress bar and page transitions. All motion is switched off for visitors who prefer reduced motion.
