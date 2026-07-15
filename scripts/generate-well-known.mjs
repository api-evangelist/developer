#!/usr/bin/env node
// Generates the RFC 9727 API catalog (linkset) from data/feeds.yml into
// public/.well-known/api-catalog (+ .json twin), and copies the OpenAPI
// contract into public/apis/ so it is served from the site root.
// Runs as part of `npm run prebuild`; outputs are gitignored (generated).

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://developer.apievangelist.com";
const OPENAPI_URL = `${SITE}/apis/apievangelist-v1-openapi.yml`;
const MCP_SERVER_CARD = "https://apievangelist.com/.well-known/mcp/server-card.json";

const feeds = yaml.load(readFileSync(join(root, "data", "feeds.yml"), "utf8"));

const describedByApisJson = [
  {
    href: "https://apisjson.org/format/",
    type: "text/html",
    title: "APIs.json specification",
  },
];

const linkset = feeds.map((feed) => {
  if (feed.kind === "api") {
    return {
      anchor: "https://api.apievangelist.com/",
      "service-desc": [
        {
          href: OPENAPI_URL,
          type: "application/vnd.oai.openapi;version=3.1",
          title: "API Evangelist Network API — OpenAPI 3.1 contract",
        },
      ],
      "service-doc": [
        {
          href: `${SITE}/`,
          type: "text/html",
          title: "API Evangelist developer portal",
        },
        {
          href: `${SITE}/api`,
          type: "text/html",
          title: "API reference",
        },
      ],
      "service-meta": [
        {
          href: feed.repo_url,
          type: "text/html",
          title: "Source repository",
        },
      ],
      "linkset-meta": { tags: feed.tags },
    };
  }

  if (feed.kind === "mcp") {
    return {
      anchor: "https://mcp.apievangelist.com/",
      "service-desc": [
        {
          href: MCP_SERVER_CARD,
          type: "application/json",
          title: "MCP server card",
        },
      ],
      "service-doc": [
        {
          href: `${SITE}/mcp-server`,
          type: "text/html",
          title: "MCP server documentation",
        },
      ],
      "service-meta": [
        {
          href: feed.repo_url,
          type: "text/html",
          title: "Source repository",
        },
      ],
      "linkset-meta": { tags: feed.tags },
    };
  }

  // Static JSON feeds — same shape the Jekyll Liquid template produced.
  const entry = {
    anchor: feed.url,
    "service-desc": [
      {
        href: feed.feed_url,
        type: "application/json",
        title: `${feed.name} feed (JSON)`,
      },
    ],
    "service-doc": [
      {
        href: `${SITE}/feeds/${feed.slug}`,
        type: "text/html",
        title: `${feed.name} feed documentation`,
      },
    ],
  };
  if (feed.apis_json_url && feed.apis_json_url !== feed.feed_url) {
    entry["service-desc"].push({
      href: feed.apis_json_url,
      type: "application/json",
      title: "APIs.json catalog (apisjson.org)",
    });
  }
  if (feed.repo_url) {
    entry["service-meta"] = [
      {
        href: feed.repo_url,
        type: "text/html",
        title: "Source repository",
      },
    ];
  }
  entry.describedby = describedByApisJson;
  if (feed.tags) {
    entry["linkset-meta"] = { tags: feed.tags };
  }
  return entry;
});

const catalog = JSON.stringify({ linkset }, null, 2) + "\n";

const wellKnownDir = join(root, "public", ".well-known");
mkdirSync(wellKnownDir, { recursive: true });
writeFileSync(join(wellKnownDir, "api-catalog"), catalog);
writeFileSync(join(wellKnownDir, "api-catalog.json"), catalog);

// Mirror the contracts into public/apis/ so each is served raw from the site root
// (public/apis/ is gitignored — apis/ is the source of truth, this is the copy).
const publicApisDir = join(root, "public", "apis");
mkdirSync(publicApisDir, { recursive: true });
const CONTRACTS = [
  "apievangelist-v1-openapi.yml",
  "apievangelist-governance-openapi.json",
];
for (const f of CONTRACTS) copyFileSync(join(root, "apis", f), join(publicApisDir, f));

console.log(
  `generate-well-known: wrote api-catalog (+ .json) with ${linkset.length} anchors and copied ${CONTRACTS.length} contracts to public/apis/`
);
