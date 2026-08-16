#!/usr/bin/env node

// Runs as part of `npm version`'s "version" lifecycle - after the version in
// package.json has been bumped, but before the release commit is made. Moves
// CHANGELOG.md's "Unreleased" entries under a new "[x.y.z] - YYYY-MM-DD"
// heading, and re-adds an empty "Unreleased" section above it.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = join(root, "CHANGELOG.md");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const version = pkg.version;

const changelog = readFileSync(changelogPath, "utf8");
const unreleasedHeading = "## [Unreleased]";
const unreleasedIndex = changelog.indexOf(unreleasedHeading);

if (unreleasedIndex === -1) {
  console.error(
    `CHANGELOG.md is missing a "${unreleasedHeading}" section - add one describing this release before running npm version.`
  );
  process.exit(1);
}

const afterHeading = changelog.slice(unreleasedIndex + unreleasedHeading.length);
const nextSectionMatch = afterHeading.match(/\n## \[/);
const sectionBody = nextSectionMatch ? afterHeading.slice(0, nextSectionMatch.index) : afterHeading;

if (!sectionBody.trim()) {
  console.error(
    `The "${unreleasedHeading}" section in CHANGELOG.md is empty - describe what changed in ${version} before running npm version.`
  );
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const updated =
  changelog.slice(0, unreleasedIndex) +
  `${unreleasedHeading}\n\n## [${version}] - ${today}` +
  changelog.slice(unreleasedIndex + unreleasedHeading.length);

writeFileSync(changelogPath, updated);
console.log(`CHANGELOG.md: moved "Unreleased" entries under [${version}] - ${today}`);
