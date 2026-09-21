# Video.js Agent Skills

> Video.js is built at [Mux](https://www.mux.com) by the teams behind Video.js, Plyr, Vidstack, and Media Chrome.

Agent skills for building media players with [Video.js](https://videojs.org).

The skill is deliberately thin. It teaches an agent how Video.js 10 is put together, how to find the docs that match the installed version, and what to check before handing code back. The docs themselves ship inside `@videojs/html` and `@videojs/react` under `docs/`, so the agent reads version-pinned pages locally and offline instead of relying on training data or a live fetch.

You can [read SKILL.md on GitHub](https://github.com/videojs/skills/blob/main/skills/videojs/SKILL.md) or fetch its [raw Markdown](https://raw.githubusercontent.com/videojs/skills/main/skills/videojs/SKILL.md).

## Installing

Choose one installation method. The plugin contains the `videojs` skill and its Markdown references only; it does not install an MCP server, hooks, executable scripts, or an account connection.

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
npx skills add https://github.com/videojs/skills --skill videojs
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
Install the Video.js skill using one method. In Codex, run `codex plugin marketplace add videojs/skills`, then `codex plugin add videojs@videojs`, and start a new session. In Claude Code, run `claude plugin marketplace add videojs/skills`, then `claude plugin install videojs@videojs`, and start a new session or run `/reload-plugins`. In VS Code or Cursor, install `https://github.com/videojs/skills` as a plugin from source. For another agent, run `npx skills add https://github.com/videojs/skills --skill videojs` and select the agent. Then use the Video.js skill when working on this project.
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

1. `node_modules/@videojs/<html|react>/docs/llms.txt`, bundled with every release.
2. [videojs.org](https://videojs.org/docs/framework/html/llms.txt) as Markdown when nothing is installed yet, with pre-release pages on [main.videojs.org](https://main.videojs.org/llms.txt).

See the [Build with AI](https://videojs.org/docs/framework/html/guides/build-with-ai) guide for other ways to feed Video.js docs to your tools.

## Contributing

Keep `SKILL.md` short and stable across releases. Version-specific detail belongs in the docs that ship inside the packages, and conditional detail belongs in `skills/videojs/references/`. Open an issue or pull request in this repository for the skill, and in [videojs/v10](https://github.com/videojs/v10) for the docs it points to.

## License

[Apache-2.0](LICENSE).
