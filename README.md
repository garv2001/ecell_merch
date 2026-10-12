# Merch × Dhanda '26 — E-Cell IIM Kozhikode

The merch catalogue as a Next.js (App Router) site. It builds to a plain static website, so any host can serve it.

## Run it locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content
Everything lives in **`data/products.ts`**:
- `DROP.orderUrl`: the Google Form that every Order button opens. Set it to `""` to hide the buttons.
- `DROP.fabric`: the "220 GSM" label.
- `PRODUCTS`: each tee's name, one-line description, colourway, optional price, images, backdrop and theme colours.

Images live in `public/assets/`. The banner stickers are in `components/Hero.tsx`.

## Deploy (anyone can open the link, no login)

### Vercel (easiest)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New → Project**, import the repo, and click **Deploy**. No settings to change.
3. You get `https://<name>.vercel.app`.

### Netlify
- **With Git:** import the repo. `netlify.toml` already sets the build command (`npm run build`) and the publish folder (`out`).
- **Without Git:** run `npm install && npm run build`, then drag the `out/` folder onto app.netlify.com/drop.

### GitHub Pages
Push to a repo, then set **Settings → Pages → Source** to "GitHub Actions". The included workflow `.github/workflows/deploy-pages.yml` builds the site with the correct `/<repo-name>` base path and publishes it.

### Firebase Hosting (Google)
```bash
npm install && npm run build
npx firebase-tools login
npx firebase-tools init hosting   # public directory: out, single-page app: No
npx firebase-tools deploy
```

## Project layout
```
app/            layout, page, global styles, self-hosted fonts
components/     Nav, Hero (sticker banner), Ticker, ProductSection,
                FullDrop, About, Interactions (360° viewer, reveals, menu, stickers, cursor)
data/           products.ts  ← edit content here
public/assets/  tee images, backdrops
```
