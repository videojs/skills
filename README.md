# Video.js Agent Skills

Agent skills for building media players with [Video.js](https://videojs.org). Video.js is built at [Mux](https://www.mux.com) by the teams behind Video.js, Plyr, Vidstack, and Media Chrome.

The skill is deliberately thin. It teaches an agent how Video.js 10 is put together, how to find the docs that match the installed version, and what to check before handing code back. The docs themselves ship inside `@videojs/html` and `@videojs/react` under `docs/`, so the agent reads version-pinned pages locally and offline instead of relying on training data or a live fetch.

You can [read SKILL.md on GitHub](https://github.com/videojs/skills/blob/main/skills/videojs/SKILL.md) or fetch its [raw Markdown](https://raw.githubusercontent.com/videojs/skills/main/skills/videojs/SKILL.md).

## Install

### Claude Code plugin

```bash
claude plugin marketplace add videojs/skills
claude plugin install videojs@videojs
```

### Other agents via skills.sh

```bash
npx skills add videojs/skills --skill videojs
```

Select your agent when prompted. Installation is project-local by default; add `-g` to install globally.

### Manual

Copy the `skills/videojs` directory into your agent's skills folder, for example `.claude/skills/videojs`, `.agents/skills/videojs`, or `.cursor/skills/videojs`.

### Or let your agent install it

Paste this into your agent:

```text
Install the Video.js skill. If you're in Claude Code, run `claude plugin marketplace add videojs/skills`, then `claude plugin install videojs@videojs`. If you're in another agent, run `npx skills add videojs/skills --skill videojs` and select your agent. Use one installation method. You can read the skill directly at https://github.com/videojs/skills/blob/main/skills/videojs/SKILL.md (raw: https://raw.githubusercontent.com/videojs/skills/main/skills/videojs/SKILL.md). Then use the Video.js skill when working on this project.
```

## Use

Ask your agent, for example:

> Add an HLS player with captions and a quality menu to the product page using Video.js.

> Play this Mux playback ID in our Next.js app with Video.js, with Mux Data turned on.

> Migrate this Video.js 8 embed to Video.js 10 in React.

In Claude Code, you can invoke the skill explicitly with `/videojs:videojs`.

| Skill | Purpose |
| --- | --- |
| [videojs](skills/videojs/SKILL.md) | Build, customize, and migrate Video.js players; walk a user through framework, install method, use case, skin, and media source; locate the bundled docs for the installed version; verify imports and playback setup |

With your permission, the skill can also draft bug reports, docs feedback, and friction logs for [videojs/v10](https://github.com/videojs/v10). It shows you the exact text first, and nothing is sent unless you say so.

## How the docs are found

1. `node_modules/@videojs/html/docs/llms.txt` or `node_modules/@videojs/react/docs/llms.txt`, bundled with every release.
2. [videojs.org](https://videojs.org/docs/framework/html/llms.txt) as Markdown when nothing is installed yet, with pre-release pages on [main.videojs.org](https://main.videojs.org/llms.txt).

See the [Build with AI](https://videojs.org/docs/framework/html/guides/build-with-ai) guide for other ways to feed Video.js docs to your tools.

## Contributing

Keep `SKILL.md` short and stable across releases. Version-specific detail belongs in the docs that ship inside the packages, and conditional detail belongs in `skills/videojs/references/`. Open an issue or pull request in this repository for the skill, and in [videojs/v10](https://github.com/videojs/v10) for the docs it points to.

## License

[Apache-2.0](LICENSE).
