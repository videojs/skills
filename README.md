# Video.js Agent Skills

> Video.js is built at [Mux](https://www.mux.com) by the teams behind Video.js, Plyr, Vidstack, and Media Chrome.

Official agent skills for building customizable, accessible video and audio players with [Video.js 10](https://videojs.org), an open-source library of composable, framework-native components for React and the web.

The skill is deliberately thin. It teaches an agent how Video.js 10 is put together, how to get installation instructions and docs that match the installed version, and what to check before handing code back. The player packages print version-matched installation plans and ship their docs under `docs/`, so the agent can work locally and offline instead of relying on training data or a live fetch.

You can [read SKILL.md on GitHub](https://github.com/videojs/skills/blob/main/skills/videojs/SKILL.md) or fetch its [raw Markdown](https://raw.githubusercontent.com/videojs/skills/main/skills/videojs/SKILL.md).

## Installing

Choose one installation method. Using the plugin does not start an MCP server, register hooks, run scripts, or connect an account.

### Codex

Install from the Video.js plugin marketplace:

```sh
codex plugin marketplace add videojs/skills
codex plugin add videojs@videojs
```

Start a new Codex session after installation.

### Claude Code plugin

Run these commands in your shell:

```sh
claude plugin marketplace add videojs/skills
claude plugin install videojs@videojs
```

Start a new Claude Code session, or run `/reload-plugins` in an open session, after installation. From inside Claude Code, the equivalent commands are `/plugin marketplace add videojs/skills` and `/plugin install videojs@videojs`.

### VS Code / GitHub Copilot

Install directly from this repository:

1. Enable `chat.plugins.enabled` in VS Code settings.
2. Open the Command Palette and run **Chat: Install Plugin From Source**.
3. Enter `https://github.com/videojs/skills`.

### Cursor

Open **Customize**, select **Plugins**, choose **From GitHub Repository**, and enter `https://github.com/videojs/skills`. The repository's Cursor marketplace installs the `videojs` skill.

### npx skills

```sh
npx skills add https://github.com/videojs/skills
```

Select your agent when prompted. Installation is project-local by default; add `-g` to install globally.

### Manual

Clone this repository and copy `skills/videojs` into the appropriate skill directory:

| Agent | Skill directory |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| OpenCode | `~/.config/opencode/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Pi | `~/.pi/agent/skills/` |

### Or let your agent install it

Paste this into your agent:

```text
Install the Video.js skill using one method. In Codex, run `codex plugin marketplace add videojs/skills`, then `codex plugin add videojs@videojs`, and start a new session. In Claude Code, run `claude plugin marketplace add videojs/skills`, then `claude plugin install videojs@videojs`, and start a new session or run `/reload-plugins`. In VS Code or Cursor, install `https://github.com/videojs/skills` as a plugin from source. For another agent, run `npx skills add https://github.com/videojs/skills` and select the agent. Then use the Video.js skill when working on this project.
```

## Use

Ask your agent, for example:

> Add an HLS player with captions and a quality menu to the product page using Video.js.

> Play this Mux playback ID in our Next.js app with Video.js, with Mux Data turned on.

> Migrate this Video.js 8 embed to Video.js 10 in React.

In Claude Code, you can invoke the skill explicitly with `/videojs:videojs`.

| Skill | Purpose |
| --- | --- |
| [videojs](skills/videojs/SKILL.md) | Build customizable, accessible Video.js 10 video and audio players; choose the framework, install method, use case, skin, and media source; locate version-matched bundled docs; verify imports and playback setup |

With your permission, the skill can also draft bug reports, docs feedback, and friction logs for [videojs/v10](https://github.com/videojs/v10). It shows you the exact text first, and nothing is sent unless you say so.

### Companion skills for custom skins

These optional skills pair well with the Shadcn installation when you are editing a Video.js skin's source:

- [shadcn/ui's official skill](https://ui.shadcn.com/docs/skills) for project configuration, registry commands, and theming.
- [Emil Kowalski's skills](https://github.com/emilkowalski/skills), especially `emil-design-eng`, `animate`, and `review-animations`, for control-bar polish and motion.

Video.js docs remain the source of truth for player structure, state, accessibility, and Video.js registry commands.

## How the docs are found

1. `npx @videojs/<html|react> agents init` for complete, version-matched installation instructions. Run it from the app directory that owns the installed package. From a pnpm workspace root, use `pnpm --dir <app> exec videojs-react agents init` or `pnpm --dir <app> exec videojs-html agents init`. The command only prints instructions.
2. `node_modules/@videojs/<html|react>/docs/llms.txt`, bundled with every release.
3. [videojs.org](https://videojs.org/docs/framework/html/llms.txt) as Markdown when nothing is installed yet, with pre-release pages on [main.videojs.org](https://main.videojs.org/llms.txt).

See the [Build with AI](https://videojs.org/docs/framework/html/guides/build-with-ai) guide for other ways to feed Video.js docs to your tools.

## Contributing

Keep `SKILL.md` short and stable across releases. Version-specific detail belongs in the docs that ship inside the packages, and conditional detail belongs in `skills/videojs/references/`. Open an issue or pull request in this repository for the skill, and in [videojs/v10](https://github.com/videojs/v10) for the docs it points to.

## License

[Apache-2.0](LICENSE).
