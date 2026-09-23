# Installation

Read this before installing Video.js, switching install method, or explaining
the choices to a user. The wording below matches the Installation guides. The
current value lists (presets, media per preset, playback adapters, Shadcn
templates and styling) come from the `agents init` output or those guides, not
from here.

## Get version-matched instructions

Run the player package's `agents init` command from the app directory, the
one whose `package.json` lists or will list the player package:

| Situation | Command |
| --- | --- |
| The player package is installed | `npx @videojs/react agents init` or `npx @videojs/html agents init` |
| Working from a pnpm workspace root | `pnpm --dir <app> exec videojs-react agents init` or `pnpm --dir <app> exec videojs-html agents init` |
| Nothing is installed yet | `npx @videojs/react agents init` or `npx @videojs/html agents init` |
| The page loads the CDN | `npx @videojs/html@<version> agents init --method cdn`, with the version from its script URL |

React uses `@videojs/react`; HTML, Vue, and Svelte use `@videojs/html`. Run only
the command for that package. Running from the app directory matters in a
monorepo: a bare command at the root may not see the app's installed package
and then fetches the latest one instead.

The bare command prints the exact flags, defaults, and compatibility rules for
that version. It installs nothing and changes no files; installing is the first
step of the plan it prints. After settling the choices below, run it again with
them as flags to get one complete installation plan, and follow it. Also pass
`--package-manager` to match the lockfile, since the plan otherwise uses npm,
and for Shadcn pass `--template` and `--styling` to match the project. Add
`--json` if structured output is easier to consume.

If commands cannot run, open the matching Installation Guide from `llms.txt`
as Markdown and use its documented query parameters instead.

Detect what you can and settle the choices in this order.

## 1. JS framework

Detect first, then confirm in one sentence: "Looks like a Next.js app, so I'll
use the React package." Only ask when the signals conflict or nothing is there.

| Signals | Route | What to tell the user |
| --- | --- | --- |
| `react` with `next`, `react-router`, `@remix-run/*`, `@tanstack/react-start`, or Vite | React | Components and hooks for React; the package's peer dependencies state the supported versions. |
| Plain `index.html`, Astro, Laravel, Rails, Django, or any stack without a component framework | HTML | Custom elements that work in any stack. |
| `vue`, `nuxt` | Vue | Vue and Nuxt use the HTML custom elements directly in templates. |
| `svelte`, `@sveltejs/kit` | Svelte | Svelte and SvelteKit use the HTML custom elements directly in markup. |
| No `package.json`, or a `<script>` from `cdn.jsdelivr.net/npm/@videojs/cdn` | HTML, via CDN | Browser-ready files, no build step. |

Astro projects with React islands can take either the React or the HTML route;
ask which the player will live in. The framework also decides the Shadcn
project template later, so note the exact meta-framework.

## 2. Install method

Present the methods available for the framework as alternatives, not steps.
The Installation guide shows which methods each framework offers.

Before presenting them, look for `components.json` in the app directory (or
the app workspace in a monorepo). If it exists, the project already uses
shadcn: lead with the Shadcn method, note that the guide's "Initialize Shadcn"
step is already done, and pass `--styling` to match the styling recorded there.

**Packaged.** "Install packages and use a ready-made skin." This is the
default recommendation: smallest decision surface, the skin updates with the
package, and the user can add the skin source later without starting over.

**Shadcn.** "Add editable skin source to your project." The `shadcn` CLI copies
the skin's components, layout, styles, and interactions into the project, under
the directory the guide names, and installs the matching Video.js package.
Recommend it when the user wants to add, remove, rearrange, or deeply restyle
controls. When the user wants a custom UI, says so, or the intended UI is clear
from what they are asking for, do not build from bare UI components: start
from the Shadcn installation of the closest preset and skin, then edit the
installed source toward their design. Bare UI components are the fallback when
no skin is close. Ask them to commit first so every added or replaced file is
reviewable.
Which presets and skins the registry covers, and the project template and
styling choices it asks for, are listed in the Shadcn Installation Guide; take
them from there rather than from memory.

**CDN.** "Load the HTML player from jsDelivr with no package manager or build
step." HTML only. Recommend it for static pages, CMS embeds, and prototypes.
The CDN guide explains the URL layout, version pinning, and what the bundles
already include; the CDN Installation Guide lists which media have a
browser-ready bundle.

## 3. Use case

"Which kind of player is this?" The answer selects a preset, a ready-made
combination of player features, skin, and media. The Installation guide lists
the current presets; at the time of writing:

- **Video** and **Audio**: general website playback with the controls people expect.
- **Live Video** and **Live Audio**: adds a Live button and drops duration and
  current-time displays. The Installation guide lists which media each live
  preset supports.
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
  will compose their own layout from UI components. Even then, prefer starting
  from the closest skin's source when one is close. The Shadcn guide states
  which skins it offers as source.

## 5. Media source

"What will it play?" Options depend on the use case, and the Installation
guide lists them. Native HTML5 video and audio need no separate package.
Streaming formats and hosted services each have a media component, and most
need a playback adapter package named in that component's reference page. A
source URL is optional; the guides use working demo media when it is empty.

If the user has no streaming source yet, asks where to host, or asks about
analytics, read `references/hosting.md`.

## Composing beyond the default example

The selected `agents init` command or queried Installation Guide returns the
complete combination. Use the deeper docs to verify or extend it:

1. Preset entry point for the player and skin: quote the Import section of the
   selected Installation Guide, the Presets concept page, or the preset's skin
   reference. Do not derive import paths from the use-case name.
2. Media component and its playback adapter, from the component's reference
   page Import section.
3. Extensions the user asked for, such as Mux Data for Mux sources, from their
   reference pages.
4. Framework wiring from the Vue or Svelte guide: `isCustomElement` for Vue,
   static imports and mount-time access for Nuxt and SvelteKit.
