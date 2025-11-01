/*
  Split a GeoJSON FeatureCollection by properties.fclass and write each group
  to a separate GeoJSON file named <fclass>.geojson in a sibling 'ways' folder.
*/

const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.resolve(__dirname, "..", "public", "map", "shenzhen", "ways.geojson");
const OUTPUT_DIR = path.resolve(__dirname, "..", "public", "map", "shenzhen", "ways");

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sanitizeFileName(name) {
  if (!name || typeof name !== "string") return "unknown";
  // Replace path separators and disallowed characters
  return (
    name
      .trim()
      .replace(/[\\\/]/g, "_")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/^\.+/, "") // no leading dots
      .slice(0, 200) || "unknown"
  );
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Input file not found: ${INPUT_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  let geojson;
  try {
    geojson = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse GeoJSON:", e.message);
    process.exit(1);
  }

  if (!geojson || geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) {
    console.error("Input is not a valid GeoJSON FeatureCollection");
    process.exit(1);
  }

  ensureDirSync(OUTPUT_DIR);

  /** @type {Record<string, any[]>} */
  const groups = Object.create(null);

  for (const feature of geojson.features) {
    const fclass = feature && feature.properties ? feature.properties.fclass : undefined;
    const key = sanitizeFileName(String(fclass ?? "unknown"));
    if (!groups[key]) groups[key] = [];
    groups[key].push(feature);
  }

  const keys = Object.keys(groups);
  for (const key of keys) {
    const out = {
      type: "FeatureCollection",
      features: groups[key]
    };
    const outPath = path.join(OUTPUT_DIR, `${key}.geojson`);
    fs.writeFileSync(outPath, JSON.stringify(out));
  }

  console.log(`Done. Wrote ${keys.length} files to: ${OUTPUT_DIR}`);
}

main();
