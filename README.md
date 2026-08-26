# Portfolio

My Portfolio containing all my experiences, projects, and research! 

Here's a link to my corner of the internet!
[My Portfolio](https://pranavik24.github.io/)
## Local Development

```bash
pnpm install
pnpm dev
```

To show the latest track from Last.fm, add the following values to `.env.local`:

```bash
VITE_LASTFM_API_KEY=your-last-fm-api-key
VITE_LASTFM_USERNAME=your-last-fm-username
```

The Last.fm values are read at build time by Vite, so restart the dev server after changing them.

## Build

```bash
pnpm build
```

The Vite config uses `base: './'`, which keeps the production build friendly for GitHub Pages project hosting.
