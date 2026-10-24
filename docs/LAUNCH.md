# Launch checklist

What is already done in the code, what was tested, and what only you (or the owner) can do after deploying.

## Before launch

### 1. SSL and HTTPS
- **Certificate:** hosts issue it, not the code. On Vercel it is automatic: add the domain under Project Settings, Domains, and point the DNS records Vercel shows. HTTPS is then on within minutes.
- **In the code:** security headers on every page (HSTS, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). `upgrade-insecure-requests` is added on Vercel, or on any host when `ENFORCE_HTTPS=true`. Self-hosting behind a TLS proxy? Set `ENFORCE_HTTPS=true` to also redirect http to https.
- **After deploying:** open the live site over https, then test the domain at ssllabs.com/ssltest and securityheaders.com.

### 2. Cross-browser and mobile
- **Tested here** in headless Chrome 153 at 320, 375, 414, 768, 1024, 1440 and 1920 pixels wide, on all six pages: no sideways overflow and no console errors.
- **Not tested here:** Safari, Firefox and real phones. Before launch, open the site on an iPhone, a low-end Android and a laptop, and tap every menu, flip card and form.
- **Browser support:** the styling needs Chrome 111+, Safari 16.4+ or Firefox 128+. Older browsers (some very old Androids, Opera Mini) show a banner asking the visitor to update or contact the shop. If many customers use such phones, tell me and we can plan a lighter fallback.

### 3. Contact form validation
- Validated in the browser and again on the server. Errors are shown beside each field, announced to screen readers, and focus jumps to the first problem.
- Spam protection: hidden honeypot field, length limits, and 5 enquiries per 10 minutes per visitor.
- 7 automated tests: `npm test`. Also tested in Chrome: empty submit, valid submit, and mail server down (the visitor is told and offered WhatsApp).

### 4. Loading and empty states
- Photos show a short shimmer while loading. The enquiry button shows a spinner while sending.
- Empty states: no search results in the shop, no reviews yet, customer photo sections hidden until photos exist.
- Error pages: a branded 404, a page error screen with Try again and WhatsApp, and a last-resort error screen.
- Note: a route-level loading screen was tried and removed. The pages are pre-built, so it only made the footer jump.

### 5. Accessibility
- Skip-to-content link, visible focus outlines, labelled forms, landmarks, reduced-motion support (all animation off when the visitor asks), keyboard access to flip cards, menus and tabs.
- **Automated result:** axe-core found 0 WCAG 2.1 A/AA problems on all six pages at phone and desktop widths. Lighthouse accessibility is 100.
- **Still worth doing by hand:** a quick pass with VoiceOver (iPhone) or TalkBack (Android).

## Immediately after launch

### 6. Favicon and Open Graph tags
- Done: favicon (icon, apple-touch icon, .ico), web app manifest, a 1200x630 share image, and Open Graph and Twitter tags on every page.
- **Set `NEXT_PUBLIC_SITE_URL` to the live domain** so share links use full addresses.
- After deploying, share the link in WhatsApp to check the preview. WhatsApp caches previews, so test with a fresh link if you change the image.

### 7. XML sitemap
- Generated at `/sitemap.xml` (6 pages) and referenced from `/robots.txt`. It uses `NEXT_PUBLIC_SITE_URL`, so set that first.

### 8. Google Search Console (owner's Google account needed)
1. Go to search.google.com/search-console and add the site. The URL-prefix option with the HTML tag is easiest.
2. Copy only the `content` value of the verification tag into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify.
3. Open Sitemaps, enter `sitemap.xml`, and submit.
4. In URL Inspection, request indexing for the home page.

### 9. Google Analytics (owner's Google account needed)
1. Create a GA4 property at analytics.google.com and a Web data stream. Copy the Measurement ID (looks like `G-XXXXXXXXXX`).
2. Put it in `NEXT_PUBLIC_GA_ID` and redeploy. The ID is baked in at build time.
3. Visitors see a small consent bar. Analytics loads only after they choose Yes.
4. Events sent: `whatsapp_click`, `phone_click`, `email_click`, `enquiry_submit`. In GA, open Admin, Events, and mark `whatsapp_click` and `enquiry_submit` as key events.
5. Check it works in GA, Reports, Realtime. Remember you must click Yes on the banner on your own visit.
- A privacy page is included at `/privacy`. Have a qualified person review it against Nigeria's data protection rules.

### 10. Broken links and speed
- **Links:** `npm run build`, `npm start`, then `npm run check:links` in another terminal. Last run: 6 pages, 21 images, no broken links, all phone, email and WhatsApp links valid.
- **Speed (Lighthouse, simulated slow phone):** performance 91 to 96 on Home, Shop, Repairs and Contact, accessibility 100, best practices 100, SEO 100, no layout shift, 0 ms blocking time. These are lab numbers from a local run. After deploying, run pagespeed.web.dev on the live URL and use the field data it shows over the following weeks.
