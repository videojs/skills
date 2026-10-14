# Companion skills

Read this when choosing which design or review skill to bring into the skin
work, or when suggesting one to install. These skills come from other
authors. Suggest each one once, say what it adds, and install it only when the
user agrees. The commands install only the named skills; the installer asks
which agents to add them to, and the authors' READMEs list plugin installs.

Video.js docs stay the source of truth for player structure, state,
accessibility, and the rules in `SKILL.md`. When a companion skill's general
advice conflicts with them, follow Video.js and say why.

## Which skill, when

| Step | Skill | Use it for | Install |
| --- | --- | --- | --- |
| Design and polish | `emil-design-eng` from [Emil Kowalski's skills](https://github.com/emilkowalski/skills) | Control-bar hierarchy, spacing, press and hover feel, the small details that make controls feel finished | `npx skills add emilkowalski/skills --skill emil-design-eng animate review-animations` |
| Motion | `animate` from the same repository | Building a new transition, such as controls showing and hiding, menus opening, or a seek indicator, deciding first whether it should animate at all | Installed with `emil-design-eng` above |
| Motion review | `review-animations` from the same repository | A strict critique of the skin's motion before handoff | Installed with `emil-design-eng` above. The user invokes it, for example with `/review-animations`; agents cannot load it on their own |
| Theming conventions | [shadcn/ui's skill](https://ui.shadcn.com/docs/skills) | OKLCH tokens, CSS variables, dark mode, and Tailwind v4 theming; registry commands when the skin is later installed into an app that uses shadcn | `npx skills add shadcn/ui --skill shadcn` |
| Final UI pass | `web-design-guidelines` from [Vercel's agent skills](https://github.com/vercel-labs/agent-skills) | Reviewing the skin's files against the Web Interface Guidelines | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| Final accessibility pass | `accessibility` from [Addy Osmani's web quality skills](https://github.com/addyosmani/web-quality-skills) | A WCAG 2.2 audit with evidence for each finding | `npx skills add addyosmani/web-quality-skills --skill accessibility` |

One audit skill is enough for the final pass; prefer whichever the user
already has.

## Where Video.js overrides them

- **Motion.** Use the skin's motion tokens so reduced motion still collapses
  them, and keep controls hiding and showing on the player's own activity
  state rather than a new timer.
- **Shadcn.** A project from `skin create` has no `components.json`, so the
  shadcn skill's project detection does not apply there; use it for theming
  conventions only. The workbench shell in `apps/preview/` is built with
  shadcn components, but it is not the skin.
- **Audits.** Generic audits check a static page. Run them on the skin's
  source in `src/` and its rendered workbench, then add the media-player
  checks in `review.md`, which they do not cover.
