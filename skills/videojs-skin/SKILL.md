---
name: videojs-skin
license: Apache-2.0
description: >
  Use when someone wants to design their own Video.js player skin: a custom
  look, layout, or set of controls for a Video.js 10 video or audio player,
  including one that replicates another player's look, such as YouTube's or
  Netflix's, built and previewed in a standalone workbench and published to
  share. Sets up the project with `npx @videojs/cli skin create`, then guides
  the design, motion, and accessibility work on the skin source. Also use in
  any project with a `skin.json` from `videojs skin create`.
---

# Design a Video.js skin

A skin is the player's UI: controls, layout, styles, and interactions around
the media. `videojs skin create` scaffolds a project that holds one skin's
source in `src/` and a workbench in `apps/preview/` that previews it across
sizes, languages, and playback settings. This skill sets that up, then keeps
the design work inside the rules a media player needs.

To restyle a skin inside an existing app instead, add its source with the
Shadcn installation method; the `videojs` skill covers that.

## 1. Set up the project

Skip this when the working directory already has a `skin.json`.

1. Run `npx @videojs/cli skin create <directory> --name <name>`. Without a
   terminal it changes nothing and lists the choices left to make, with their
   defaults; `--help` explains them. If `skin create` is not recognized, the
   CLI predates it: use the `videojs` skill's Shadcn method instead.
2. Propose every choice in one message and confirm once. Framework is React
   or HTML. For the starting skin, ask whether they want to build their own
   design from a foundation (Scaffold, every control wired up with minimal
   styling) or brand a finished design (Neutral is easy to brand, Default is
   the distinct Video.js design, Compat trades features for browser reach).
   The preset is the kind of player: video, audio, live video, or live audio.
   If they want to replicate a specific player, read
   `references/replicate.md` first; what you capture decides the starting
   skin.
3. Run the command again with every choice as a flag. It installs
   dependencies and prints the commands to start the workbench. Start the
   dev server in the background and share the workbench URL it prints.

## 2. Orient

Read the project's `AGENTS.md`, `README.md`, and `skin.json` before editing.
They describe this version's layout, scripts, and workbench; trust them over
this skill. Video.js docs ship with the installed package at
`node_modules/@videojs/<react|html>/docs/llms.txt`; fall back to
`https://videojs.org/docs/framework/<react|html>/llms.txt` and append `.md` to
page URLs. Start with these pages, by title:

| Need | Read |
| --- | --- |
| Which file owns a change | Customize skins, "Style skin source" |
| How controls expose state, props, and render customization | UI components, then each component's reference page |
| Shortcuts and gestures | Keyboard shortcuts |
| Labels, languages, right-to-left | Internationalization |
| What the components already do for accessibility | Accessibility |

## 3. Design and build

The `videojs-ui` skill covers the craft of each control: contrast over video,
icon states, motion, type, color, labels, and the companion design and audit
skills to pair with it. A skin project adds these rules:

- **Edit the skin, not the workbench.** All skin code lives in `src/` and
  imports nothing from `apps/preview/`, so it can move into an app as is.
- **Change tokens before rules.** Colors, surfaces, radii, sizes, and motion
  are CSS custom properties in the skin's theme files. Keep the public
  properties packaged skins expose, such as `--media-accent-color`, working.
- **Style state with `data-*` attributes** that components set, such as
  `data-paused`, not classes toggled in script.
- **Size with container queries.** The player is rarely the viewport's width.
- **Keep the container's `data-theme` and `data-preset`.** The styles select
  on them.
- **Add motion through the skin's motion tokens**, which its preferences
  stylesheet collapses under reduced motion.
- **Keep what the skin provides beyond looks**: the error dialog, hotkeys,
  gestures, and status announcer. Replace them only with equivalents.
- **Reorder controls in source, not with CSS.** Focus order must match the
  visual order; right-to-left layout is the exception the skin handles.

Then follow the framework's composition rules from the docs: in React, spread
the `props` a `render` function receives; in HTML, import every element part
you render and keep the `id`, `trigger`, and `commandfor` pairs that wire
tooltips and popups to their buttons unique and matched.

## 4. Verify

1. Run the project's `typecheck` and `build` scripts.
2. Check the skin in the workbench in every state the change can affect: its
   options panel sets width, aspect ratio, color scheme, direction, language,
   and playback, and the project's `README.md` shows how to open a state
   from the URL. Use `videojs-ui`'s review for what to look for; it covers
   what generic UI audits miss on a video player.

## 5. Publish, when asked

The project's `deploy` script publishes the workbench to Vercel, Netlify, or
Cloudflare Pages. It creates a public URL and signs in to the host, so run it
only when the user asks. Without a terminal, name the host:
`<package manager> run deploy vercel`. With pnpm, keep `run`: `pnpm deploy` is
a different, built-in command. The user completes the host's sign-in.

## Send feedback upstream, with consent

When a task exposes a bug or docs gap in Video.js or `skin create`, offer once
at a stopping point to draft feedback, following the `videojs` skill's
feedback rules. Never send without explicit approval of the exact text.
