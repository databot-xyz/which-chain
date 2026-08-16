#!/usr/bin/env node

// Extracts one version's section body from CHANGELOG.md, for use as a
// GitHub Release's notes. Usage: node scripts/changelog-notes.mjs 0.2.0

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const version = process.argv[2];
if (!version) {
  console.error("Usage: node scripts/changelog-notes.mjs <version>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
const heading = `## [${version}]`;
const headingIndex = changelog.indexOf(heading);

if (headingIndex === -1) {
  console.error(`No CHANGELOG.md section found for "${heading}"`);
  process.exit(1);
}

const afterHeadingLine = changelog.indexOf("\n", headingIndex) + 1;
const rest = changelog.slice(afterHeadingLine);
const nextSectionMatch = rest.match(/\n## \[/);
const body = (nextSectionMatch ? rest.slice(0, nextSectionMatch.index) : rest).trim();

process.stdout.write(body + "\n");
