#!/usr/bin/env node
/**
 * Converts raw screenshots into web-ready WebP files for a project.
 *
 * Usage:
 *   npm run images -- <input-dir> <project-slug> [max-width]
 *
 * Example:
 *   npm run images -- ~/Desktop/aleyada-shots aleyada
 *
 * Every .png/.jpg/.jpeg/.webp in <input-dir> is resized to at most
 * [max-width] pixels wide (default 600, i.e. 2x a ~300px phone frame),
 * converted to WebP and written to public/projects/<project-slug>/ with a
 * kebab-case file name. The printed width/height go into src/content/projects.ts.
 */
import { mkdir, readdir } from "node:fs/promises";
import { extname, join, parse, resolve } from "node:path";
import sharp from "sharp";

const [inputDir, slug, maxWidthArg] = process.argv.slice(2);

if (!inputDir || !slug) {
  console.error("Usage: npm run images -- <input-dir> <project-slug> [max-width]");
  process.exit(1);
}

const maxWidth = Number(maxWidthArg ?? 600);
const outputDir = resolve("public", "projects", slug);
const supported = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function kebab(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(inputDir)).filter((file) =>
  supported.has(extname(file).toLowerCase()),
);

if (files.length === 0) {
  console.error(`No images found in ${inputDir}`);
  process.exit(1);
}

for (const file of files) {
  const output = join(outputDir, `${kebab(parse(file).name)}.webp`);
  const info = await sharp(join(inputDir, file))
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(output);

  console.log(`${output}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
