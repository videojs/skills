import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const expectedName = "videojs";
const expectedVersion = "0.1.0";
const expectedDescription =
  "Build customizable, accessible video and audio players with Video.js 10, an open-source library of composable, framework-native components for React and the web.";
const expectedMarketplaceDescription =
  "Official Video.js agent plugins for building customizable, accessible video and audio players.";
const expectedShortDescription = "Build accessible media players";
const expectedLongDescription =
  "Build customizable, accessible video and audio players with Video.js 10. Compose framework-native React components or HTML custom elements, start with packaged skins, or own the UI with custom controls. Support native, on-demand, live, audio, and background playback across HLS, DASH, DRM, and hosted media providers, with captions, quality selection, casting, analytics, and more.";
const expectedKeywords = [
  "videojs",
  "video.js",
  "videojs-10",
  "video-player",
  "audio-player",
  "media-player",
  "component-library",
  "html5-video",
  "html5-audio",
  "video-on-demand",
  "live-streaming",
  "background-video",
  "streaming-media",
  "adaptive-bitrate",
  "media-ui",
  "player-ui",
  "custom-controls",
  "composable-components",
  "react-components",
  "web-components",
  "custom-elements",
  "skins",
  "theming",
  "shadcn",
  "css-custom-properties",
  "accessible-media",
  "accessibility",
  "wcag",
  "wai-aria",
  "keyboard-navigation",
  "screen-reader",
  "captions",
  "subtitles",
  "reduced-motion",
  "high-contrast",
  "internationalization",
  "i18n",
  "hls",
  "hls.js",
  "dash",
  "dash.js",
  "shaka-player",
  "native-hls",
  "drm",
  "audio-tracks",
  "text-tracks",
  "quality-selection",
  "picture-in-picture",
  "fullscreen",
  "airplay",
  "google-cast",
  "chromecast",
  "mux",
  "mux-data",
  "cloudflare-stream",
  "youtube",
  "vimeo",
  "wistia",
  "twitch",
  "tiktok",
  "spotify",
  "react",
  "nextjs",
  "vue",
  "nuxt",
  "svelte",
  "sveltekit",
  "astro",
];
const expectedTags = ["video", "audio", "streaming", "accessibility", "ui", "frontend"];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function loadJson(relativePath) {
  const absolutePath = resolve(root, relativePath);
  assert(existsSync(absolutePath), `Missing ${relativePath}`);

  try {
    return JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
  }
}

function pluginEntry(marketplace, relativePath) {
  assert(Array.isArray(marketplace.plugins), `${relativePath} must contain plugins[]`);
  const entry = marketplace.plugins.find(({ name }) => name === expectedName);
  assert(entry, `${relativePath} does not expose ${expectedName}`);
  return entry;
}

function assertEqualArray(actual, expected, message) {
  assert(Array.isArray(actual), `${message}: expected an array`);
  assert(JSON.stringify(actual) === JSON.stringify(expected), message);
}

const portable = loadJson("plugin.json");
const codex = loadJson(".codex-plugin/plugin.json");
const cursor = loadJson(".cursor-plugin/plugin.json");
const claude = loadJson(".claude-plugin/plugin.json");

for (const [relativePath, manifest] of [
  ["plugin.json", portable],
  [".codex-plugin/plugin.json", codex],
  [".cursor-plugin/plugin.json", cursor],
  [".claude-plugin/plugin.json", claude],
]) {
  assert(manifest.name === expectedName, `${relativePath} has the wrong name`);
  assert(manifest.version === expectedVersion, `${relativePath} has the wrong version`);
  assert(
    manifest.description === expectedDescription,
    `${relativePath} has drifted description copy`,
  );
  assertEqualArray(manifest.keywords, expectedKeywords, `${relativePath} has drifted keywords`);
}

assert(
  portable.$schema === "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "plugin.json must declare the Agent Plugins 1.0 schema",
);
assert(existsSync(resolve(root, "skills/videojs/SKILL.md")), "Missing videojs skill");

assert(codex.skills === "./skills/", "Codex manifest must expose ./skills/");
for (const field of [
  "displayName",
  "shortDescription",
  "longDescription",
  "developerName",
  "category",
  "capabilities",
  "defaultPrompt",
]) {
  assert(codex.interface?.[field], `Codex interface is missing ${field}`);
}
assert(
  codex.interface.shortDescription === expectedShortDescription,
  "Codex short description has drifted",
);
assert(codex.interface.shortDescription.length <= 30, "Codex short description exceeds 30 characters");
assert(
  codex.interface.longDescription === expectedLongDescription,
  "Codex long description has drifted",
);
for (const field of ["composerIcon", "logo"]) {
  const assetPath = codex.interface[field];
  assert(assetPath.startsWith("./"), `Codex ${field} must start with ./`);
  assert(existsSync(resolve(root, assetPath)), `Codex ${field} does not exist: ${assetPath}`);
}
assert(cursor.logo === "logo.svg", "Cursor logo must use a repository-relative path");
assert(existsSync(resolve(root, cursor.logo)), `Cursor logo does not exist: ${cursor.logo}`);

const codexMarketplace = loadJson(".agents/plugins/marketplace.json");
assert(codexMarketplace.name === expectedName, "Codex marketplace has the wrong name");
const codexEntry = pluginEntry(codexMarketplace, ".agents/plugins/marketplace.json");
assert(codexEntry.source?.source === "url", "Codex root plugin must use a URL source");
assert(
  codexEntry.source.url === "https://github.com/videojs/skills.git",
  "Codex marketplace has the wrong repository URL",
);
assert(codexEntry.policy?.installation === "AVAILABLE", "Codex install policy is missing");
assert(codexEntry.policy?.authentication === "ON_INSTALL", "Codex auth policy is missing");
assert(codexEntry.category === "Developer Tools", "Codex category is missing");

const claudeMarketplace = loadJson(".claude-plugin/marketplace.json");
assert(claude.displayName === "Video.js", "Claude manifest display name is missing");
assert(
  claudeMarketplace.$schema === "https://code.claude.com/schemas/marketplace.json",
  "Claude marketplace schema is missing",
);
assert(
  claudeMarketplace.description === expectedMarketplaceDescription,
  "Claude marketplace has drifted description copy",
);
const claudeEntry = pluginEntry(claudeMarketplace, ".claude-plugin/marketplace.json");
assert(
  claudeEntry.source === "./",
  "Claude marketplace must expose the root plugin",
);
assert(claudeEntry.displayName === "Video.js", "Claude display name is missing");
assert(claudeEntry.description === expectedDescription, "Claude plugin entry has drifted description");
assert(claudeEntry.category === "Developer Tools", "Claude category is missing");
assertEqualArray(claudeEntry.keywords, expectedKeywords, "Claude plugin entry has drifted keywords");
assertEqualArray(claudeEntry.tags, expectedTags, "Claude plugin entry has drifted tags");

const cursorMarketplace = loadJson(".cursor-plugin/marketplace.json");
assert(
  cursorMarketplace.metadata?.description === expectedMarketplaceDescription,
  "Cursor marketplace has drifted description copy",
);
const cursorEntry = pluginEntry(cursorMarketplace, ".cursor-plugin/marketplace.json");
assert(
  cursorEntry.source === "./",
  "Cursor marketplace must expose the root plugin",
);
assert(cursorEntry.description === expectedDescription, "Cursor plugin entry has drifted description");
assert(cursorEntry.category === "Developer Tools", "Cursor category is missing");
assertEqualArray(cursorEntry.keywords, expectedKeywords, "Cursor plugin entry has drifted keywords");
assertEqualArray(cursorEntry.tags, expectedTags, "Cursor plugin entry has drifted tags");

const skill = readFileSync(resolve(root, "skills/videojs/SKILL.md"), "utf8");
assert(/^---\n[\s\S]*?^name:\s*videojs\s*$[\s\S]*?^---$/m.test(skill), "Skill frontmatter name is invalid");
assert(Buffer.byteLength(skill, "utf8") < 10_000, "SKILL.md must stay under 10,000 bytes");
assert(skill.trimEnd().split("\n").length < 200, "SKILL.md must stay under 200 lines");
const normalizedSkill = skill.replace(/\s+/g, " ");
assert(
  normalizedSkill.includes("an HTML `video` or `audio` element"),
  "Skill description must route generic video and audio element tasks",
);
assert(
  normalizedSkill.includes("a `<video>` or `<audio>` element"),
  "Skill body must name literal video and audio elements",
);

const readme = readFileSync(resolve(root, "README.md"), "utf8");
for (const instruction of [
  "codex plugin add videojs@videojs",
  "claude plugin install videojs@videojs",
  "Chat: Install Plugin From Source",
  "From GitHub Repository",
  "npx skills add https://github.com/videojs/skills",
]) {
  assert(readme.includes(instruction), `README is missing: ${instruction}`);
}

console.log("Validated portable, Codex, Claude Code, Cursor, and skills.sh packaging.");
