# Bug Reproduction Repository

This repository is created to reproduce and document a specific bug or issue in QwikCity.

## Bug Description

Cloudflare Pages integration is incompatitble with Supabase. It will give the following error when trying to build:

```plaintext
[commonjs--resolver] Cannot bundle Node.js built-in "stream" imported from "node_modules/@supabase/node-fetch/lib/index.mjs". Consider disabling ssr.noExternal or remove the built-in dependency.
error during build:
RollupError: Cannot bundle Node.js built-in "stream" imported from "node_modules/@supabase/node-fetch/lib/index.mjs". Consider disabling ssr.noExternal or remove the built-in dependency.
    at error (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:2287:30)
    at Object.error (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:25268:20)
    at Object.resolveId (qwik-supabase-bug-reproduce/node_modules/vite/dist/node/chunks/dep-3b8eb186.js:28210:34)
    at Object.handler (qwik-supabase-bug-reproduce/node_modules/vite/dist/node/chunks/dep-3b8eb186.js:48180:19)
    at qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:25461:40
    at async PluginDriver.hookFirstAndGetPlugin (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:25361:28)
    at async resolveId (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:24035:26)
    at async ModuleLoader.resolveId (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:24449:15)
    at async Object.resolveId (qwik-supabase-bug-reproduce/node_modules/vite/dist/node/chunks/dep-3b8eb186.js:7984:10)
    at async PluginDriver.hookFirstAndGetPlugin (qwik-supabase-bug-reproduce/node_modules/rollup/dist/es/shared/node-entry.js:25361:28)
```

## Steps to Reproduce

1. Clone this repository.
2. Run `npm run build`.

## Tentative Fix

1. Install the following browserify packages:

```bash
npm install assert buffer events stream-http https-browserify punycode stream-browserify url util browserify-zlib
```

2. Add the following to `vite.config.ts`:

```typescript
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        assert: "assert",
        buffer: "buffer",
        events: "events",
        http: "stream-http",
        https: "https-browserify",
        punycode: "punycode",
        stream: "stream-browserify",
        url: "url",
        util: "util",
        zlib: "browserify-zlib",
      },
    },
    // ...
  };
});
```
