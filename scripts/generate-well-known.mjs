#!/usr/bin/env node
// Generates the RFC 9727 API catalog (linkset) into public/.well-known/api-catalog
// (+ .json twin), and copies the OpenAPI contracts into public/apis/ so they are
// served from the site root.
// Runs as part of `npm run prebuild`; outputs are gitignored (generated).

import { writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://developer.apievangelist.com";
const OPENAPI_URL = `${SITE}/apis/apievangelist-v1-openapi.yml`;
const GOVERNANCE_OPENAPI_URL = `${SITE}/apis/apievangelist-governance-openapi.json`;
const MCP_SERVER_CARD = "https://apievangelist.com/.well-known/mcp/server-card.json";
const REPO_URL = "https://github.com/api-evangelist/apievangelist-aws";

const sourceRepo = [{ href: REPO_URL, type: "text/html", title: "Source repository" }];

const linkset = [
  {
    anchor: "https://api.apievangelist.com/",
    "service-desc": [
      {
        href: OPENAPI_URL,
        type: "application/vnd.oai.openapi;version=3.1",
        title: "API Evangelist Network API — OpenAPI 3.1 contract",
      },
    ],
    "service-doc": [
      { href: `${SITE}/`, type: "text/html", title: "API Evangelist developer portal" },
      { href: `${SITE}/api`, type: "text/html", title: "API reference" },
    ],
    "service-meta": sourceRepo,
    "linkset-meta": { tags: ["API"] },
  },
  {
    anchor: "https://api.apievangelist.com/v1/governance",
    "service-desc": [
      {
        href: GOVERNANCE_OPENAPI_URL,
        type: "application/vnd.oai.openapi+json;version=3.1",
        title: "API Evangelist Governance & Discovery API — OpenAPI 3.1 contract",
      },
    ],
    "service-doc": [
      { href: `${SITE}/governance-api`, type: "text/html", title: "Governance API reference" },
      { href: `${SITE}/governance/index`, type: "text/html", title: "Governance & Discovery documentation" },
    ],
    "service-meta": sourceRepo,
    "linkset-meta": { tags: ["Governance", "Discovery"] },
  },
  {
    anchor: "https://mcp.apievangelist.com/",
    "service-desc": [
      { href: MCP_SERVER_CARD, type: "application/json", title: "MCP server card" },
    ],
    "service-doc": [
      { href: `${SITE}/mcp-server`, type: "text/html", title: "MCP server documentation" },
    ],
    "service-meta": sourceRepo,
    "linkset-meta": { tags: ["MCP", "Agents"] },
  },
];

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
