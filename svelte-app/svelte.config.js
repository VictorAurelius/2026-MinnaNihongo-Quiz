import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      // Use a dedicated SPA-fallback filename (NOT index.html) so the
      // prerendered home page (`/` -> build/index.html) is not overwritten by
      // the neutral fallback shell. postbuild.js copies 200.html -> 404.html
      // for the GitHub Pages SPA deep-link fallback. Netlify/Vercel rewrite
      // unknown routes to /index.html (static files keep filesystem precedence,
      // so prerendered pages still serve directly).
      fallback: '200.html',
      precompress: true,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/2026-Smart-Quiz' : ''
    },
    prerender: {
      // Static content pages opt into prerendering for crawler-visible HTML.
      // app.html / manifest.json reference optional icon assets (favicon.png,
      // icon-192.png, icon-512.png) that were never committed as real PNGs
      // (only .txt placeholders exist). The prerender crawler surfaces these
      // pre-existing 404s — warn rather than fail the build. Every OTHER HTTP
      // error (e.g. a broken internal content link) still fails the build.
      handleHttpError: ({ status, path, referrer, message }) => {
        const missingOptionalAssets = ['/favicon.png', '/icon-192.png', '/icon-512.png'];
        if (status === 404 && missingOptionalAssets.some((asset) => path.endsWith(asset))) {
          console.warn(`[prerender] ignoring missing optional asset: ${path} (linked from ${referrer})`);
          return;
        }
        throw new Error(message);
      }
    },
    alias: {
      '$lib': './src/lib',
      '$lib/*': './src/lib/*'
    }
  }
};

export default config;
