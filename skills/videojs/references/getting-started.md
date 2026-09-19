# Getting started with a user

Read this when you are about to install Video.js for someone and need to
explain the choices. The wording below matches the Installation guides; the
current value lists (supported media per use case, playback adapters, registry
templates) live in those guides, so quote them from the bundled docs rather
than from here.

## 1. JS framework

Detect first, then confirm in one sentence: "Looks like a Next.js app, so I'll
use the React package." Only ask when the signals conflict or nothing is there.

| Signals | Route | What to tell the user |
| --- | --- | --- |
| `react` with `next`, `react-router`, `@remix-run/*`, `@tanstack/react-start`, or Vite | React | Components and hooks for React 19. |
| Plain `index.html`, Astro, Laravel, Rails, Django, or any stack without a component framework | HTML | Custom elements that work in any stack. |
| `vue`, `nuxt` | Vue | Vue 3 and Nuxt use the HTML custom elements directly in templates. |
| `svelte`, `@sveltejs/kit` | Svelte | Svelte 5 and SvelteKit use the HTML custom elements directly in markup. |
| No `package.json`, or a `<script>` from `cdn.jsdelivr.net/npm/@videojs/cdn` | HTML, via CDN | Browser-ready files, no build step. |

Astro projects with React islands can take either the React or the HTML route;
ask which the player will live in. The framework also decides the Shadcn
project template later, so note the exact meta-framework.

## 2. Install method

Present the methods available for the framework as alternatives, not steps.
React offers Packaged and Shadcn. HTML offers Packaged, Shadcn, and CDN. Vue
and Svelte offer Packaged.

Before presenting them, look for `components.json` in the app directory (or
the app workspace in a monorepo). If it exists, the project already uses
shadcn: lead with the Shadcn method, note that the guide's "Initialize Shadcn"
step is already done, and reuse the existing styling choice recorded there.

**Packaged.** "Install packages and use a ready-made skin." The skin stays
inside Video.js and is styled through documented CSS custom properties. This is
the default recommendation: smallest decision surface, upgrades are an
`npm update`, and the user can move to skin source later without starting over.

**Shadcn.** "Add editable skin source to your project." The `shadcn` CLI copies
the skin's components, layout, styles, and interactions into the project, under
`components/videojs/<preset>`, and installs the matching Video.js package. React
skins come as Tailwind CSS or Vanilla CSS; HTML skins are Vanilla CSS. The
registry provides the Default and Minimal skins for Video, Audio, Live Video,
and Live Audio. It does not provide Background Video or a no-skin option.
Recommend it when the user wants to add, remove, rearrange, or deeply restyle
controls. Ask them to commit first so every added or replaced file is reviewable.
The Shadcn guide asks for a project template (for example Next.js, Vite,
TanStack Start, Astro) and a styling choice; take the current lists from it.

**CDN.** "Load the HTML player from jsDelivr with no package manager or build
step." HTML only. Recommend it for static pages, CMS embeds, and prototypes.
Every URL must pin the same version, because bundles share content-hashed
chunks. Only media with a browser-ready bundle are offered; check the CDN
Installation Guide's media list. Playback adapters are already inside the
bundles, so nothing is installed from npm.

## 3. Use case

"Which kind of player is this?" The answer selects a preset, a ready-made
combination of player features, skin, and media.

- **Video** and **Audio**: general website playback with the controls people expect.
- **Live Video** and **Live Audio**: adds a Live button and drops duration and
  current-time displays. Live Video supports HLS and Mux video; Live Audio
  supports Mux audio.
- **Background Video**: muted, looping, chrome-less video behind content.

## 4. Skin

Default and Minimal are two looks for the same player. Both bring the full
control set: controls, tooltips, captions, keyboard shortcuts, touch gestures,
and a settings menu that appears when there is something to put in it.

- **Default**: the modern, frosted look with translucent, blurred surfaces.
- **Minimal**: the visually lighter look, with flat backgrounds and visible
  borders, closer to a classic control bar. "Minimal" describes the aesthetic,
  not the number of controls.
- **No skin**: player and media behavior with no packaged UI, for users who
  will compose their own layout from UI components. Not offered with Shadcn.

## 5. Media source

"What will it play?" Options depend on the use case. Native HTML5 video and
audio and Background Video need no separate package. HLS, DASH, Mux, and the
embed players (YouTube, Vimeo, Cloudflare Stream, TikTok, Twitch, Spotify)
have their own media component, and most need a playback adapter package named
in that component's reference page. A source URL is optional; the guides use
working demo media when it is empty.

## Composing beyond the default example

Each Installation Guide's code shows one combination: Video, Default skin,
native HTML5 video. For anything else, build from the docs instead of editing
that example blind:

1. Preset entry point for the player and skin, from the Presets concept page or
   the preset's skin reference (`@videojs/html/<preset>/player` and `/skin`, or
   `@videojs/react/<preset>`).
2. Media component and its playback adapter, from the component's reference
   page Import section.
3. Extensions the user asked for, such as Mux Data for Mux sources, from their
   reference pages.
4. Framework wiring from the Vue or Svelte guide: `isCustomElement` for Vue,
   static imports and mount-time access for Nuxt and SvelteKit.
