import { defineConfig } from 'astro/config';

// Both values are set automatically by the GitHub Pages workflow.
const base = process.env.PAGES_BASE || '/';
export default defineConfig({
  site: process.env.PAGES_SITE || 'https://example.invalid',
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { server: { allowedHosts: ['localhost', '127.0.0.1'] } },
});
