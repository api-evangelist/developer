#!/usr/bin/env node
// Generates pages/feeds/index.mdx + pages/feeds/<slug>.mdx from data/feeds.yml.
// Runs as part of `npm run prebuild`; pages/feeds/ is gitignored (generated).

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const feeds = yaml.load(readFileSync(join(root, "data", "feeds.yml"), "utf8"));

const outDir = join(root, "pages", "feeds");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");

const kindLabel = { api: "API", mcp: "MCP", feed: "Feed" };

// --- pages/feeds/index.mdx -------------------------------------------------

const indexRows = feeds
  .map(
    (f) =>
      `| [${esc(f.name)}](./${f.slug}) | ${kindLabel[f.kind] ?? "Feed"} | ${esc(
        f.description
      )} | [${esc(f.feed_url)}](${f.feed_url}) |`
  )
  .join("\n");

const indexPage = `---
title: Static Feeds
---

Every collection in the API Evangelist network is published as a **static, zero-auth JSON feed** —
the no-key alternative to the [Network API](/api). No signup, no rate limits, CORS-enabled, served
straight from static hosting. Pick a feed, fetch the JSON, parse it, integrate it.

The [Network API](/api) and [MCP server](../mcp-server) are listed first — they serve the same
research as one queryable surface when a static file isn't enough.

| Name | Kind | What it is | URL |
| --- | --- | --- | --- |
${indexRows}

## Using the feeds

\`\`\`javascript
const res = await fetch("https://policies.apievangelist.com/policies.json");
const policies = await res.json();
policies.forEach((p) => console.log(p.name, p.tags));
\`\`\`

A machine-readable catalog of every entry above is published as an
[RFC 9727 API catalog](https://developer.apievangelist.com/.well-known/api-catalog) at
\`/.well-known/api-catalog\`, and via the API itself at
[\`/v1/feeds\`](https://api.apievangelist.com/v1/feeds).
`;

writeFileSync(join(outDir, "index.mdx"), indexPage);

// --- pages/feeds/<slug>.mdx ------------------------------------------------

for (const f of feeds) {
  const lines = [];
  lines.push("---");
  lines.push(`title: "${f.name.replace(/"/g, '\\"')}"`);
  lines.push("---");
  lines.push("");
  lines.push(f.description);
  lines.push("");

  if (f.kind === "api") {
    lines.push("Base URL:");
  } else if (f.kind === "mcp") {
    lines.push("Streamable HTTP endpoint:");
  } else {
    lines.push("Feed URL:");
  }
  lines.push("");
  lines.push("```");
  lines.push(f.feed_url);
  lines.push("```");
  lines.push("");

  const links = [];
  if (f.url && f.url !== f.feed_url) {
    links.push(`- Browse: [${f.url}](${f.url})`);
  }
  if (f.openapi_url) {
    links.push(`- OpenAPI: [${f.openapi_url}](${f.openapi_url})`);
  }
  if (f.apis_json_url) {
    links.push(`- APIs.json: [${f.apis_json_url}](${f.apis_json_url})`);
  }
  if (f.repo_url) {
    links.push(`- Source repository: [${f.repo_url}](${f.repo_url})`);
  }
  if (f.kind === "api") {
    links.push("- Full documentation: [API Reference](/api)");
  }
  if (f.kind === "mcp") {
    links.push("- Full documentation: [MCP Server](../mcp-server)");
  }
  if (links.length) {
    lines.push(links.join("\n"));
    lines.push("");
  }

  if (Array.isArray(f.fields) && f.fields.length) {
    lines.push("## Fields");
    lines.push("");
    lines.push("| Field | Type | Description |");
    lines.push("| --- | --- | --- |");
    for (const field of f.fields) {
      lines.push(
        `| \`${field.name}\` | ${esc(field.type)} | ${esc(field.description)} |`
      );
    }
    lines.push("");
  }

  if (Array.isArray(f.tags) && f.tags.length) {
    lines.push(`Tags: ${f.tags.map((t) => `\`${t}\``).join(", ")}`);
    lines.push("");
  }

  writeFileSync(join(outDir, `${f.slug}.mdx`), lines.join("\n"));
}

console.log(`generate-feeds-pages: wrote index + ${feeds.length} feed pages to pages/feeds/`);
