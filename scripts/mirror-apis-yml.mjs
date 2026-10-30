#!/usr/bin/env node
// Publishes the API Evangelist provider profile (apis.yml) and the artifacts it references
// from this portal, a host we control.
//
// The profile is canonical in the private profile store
// (s3://api-evangelist-profiles/providers/api-evangelist/); it left GitHub on 2026-10-26.
// GitHub Actions has no AWS credentials, so scripts/sync-profile.py snapshots it into
// profile/, which is committed, and this script copies the snapshot into public/ on every
// build. `x-canonical-profile` in the output names the source so the copy can never be
// mistaken for the original.
//
// Note apievangelist.com/apis.yml is a DIFFERENT index (aid: posts, scoped to the
// website repo) -- this one belongs on the developer portal.

import { writeFileSync, readFileSync, existsSync, cpSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const SRC = join(root, "profile");
const PUBLIC = join(root, "public");
const CANONICAL = "s3://api-evangelist-profiles/providers/api-evangelist/apis.yml";
const SELF = "https://developer.apievangelist.com/apis.yml";
// The profile still names its old GitHub home as its own URL; published here, it lives here.
const OLD_SELF = "https://raw.githubusercontent.com/api-evangelist/api-evangelist/refs/heads/main/apis.yml";

if (!existsSync(join(SRC, "apis.yml"))) {
  // A missing snapshot is a broken checkout, not a transient error: fail the build rather
  // than publish a portal whose /apis.yml quietly serves the 404 page.
  console.error("mirror-apis-yml: profile/apis.yml is missing -- run scripts/sync-profile.py");
  process.exit(1);
}

const body = readFileSync(join(SRC, "apis.yml"), "utf8");
if (!body.startsWith("aid: api-evangelist")) {
  console.error("mirror-apis-yml: profile/apis.yml is not the api-evangelist profile");
  process.exit(1);
}

const banner =
  `# The API Evangelist provider profile, served from the host we control.\n` +
  `# Canonical source: ${CANONICAL} (snapshot synced by scripts/sync-profile.py)\n` +
  `# Copied into the portal on every build -- do not edit here.\n`;
writeFileSync(join(PUBLIC, "apis.yml"), banner + body.replaceAll(OLD_SELF, SELF), "utf8");

// The referenced artifacts keep their relative paths, so every reference resolves next to apis.yml.
const dirs = readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory());
for (const d of dirs) cpSync(join(SRC, d.name), join(PUBLIC, d.name), { recursive: true });
console.log(`mirror-apis-yml: published apis.yml + ${dirs.length} artifact folders`);
