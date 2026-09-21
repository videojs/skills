import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const expectedName = "videojs";
const expectedVersion = "0.1.0";
const expectedDescription =
  "Build, customize, debug, and migrate media players with Video.js using version-matched documentation.";

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
for (const field of ["composerIcon", "logo"]) {
  const assetPath = codex.interface[field];
  assert(existsSync(resolve(root, assetPath)), `Codex ${field} does not exist: ${assetPath}`);
}
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
assert(
  claudeMarketplace.$schema === "https://code.claude.com/schemas/marketplace.json",
  "Claude marketplace schema is missing",
);
assert(
  pluginEntry(claudeMarketplace, ".claude-plugin/marketplace.json").source === "./",
  "Claude marketplace must expose the root plugin",
);

const cursorMarketplace = loadJson(".cursor-plugin/marketplace.json");
assert(
  pluginEntry(cursorMarketplace, ".cursor-plugin/marketplace.json").source === "./",
  "Cursor marketplace must expose the root plugin",
);

const skill = readFileSync(resolve(root, "skills/videojs/SKILL.md"), "utf8");
assert(/^---\n[\s\S]*?^name:\s*videojs\s*$[\s\S]*?^---$/m.test(skill), "Skill frontmatter name is invalid");

const readme = readFileSync(resolve(root, "README.md"), "utf8");
for (const instruction of [
  "codex plugin add videojs@videojs",
  "claude plugin install videojs@videojs",
  "Chat: Install Plugin From Source",
  "From GitHub Repository",
  "npx skills add https://github.com/videojs/skills --skill videojs",
]) {
  assert(readme.includes(instruction), `README is missing: ${instruction}`);
}

console.log("Validated portable, Codex, Claude Code, Cursor, and skills.sh packaging.");
