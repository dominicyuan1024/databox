/*
  Merge GeoJSON files in public/map/shenzhen/ways:
  For each file matching <name>_link.geojson, merge its features into <name>.geojson.
  After merging, overwrite <name>.geojson and delete <name>_link.geojson.
*/

const fs = require("fs");
const path = require("path");

const WAYS_DIR = path.resolve(__dirname, "..", "public", "map", "shenzhen", "ways");

function readGeojson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const gj = JSON.parse(raw);
    if (!gj || gj.type !== "FeatureCollection" || !Array.isArray(gj.features)) return null;
    return gj;
  } catch {
    return null;
  }
}

function writeGeojson(filePath, fc) {
  fs.writeFileSync(filePath, JSON.stringify(fc));
}

function main() {
  if (!fs.existsSync(WAYS_DIR)) {
    console.error("Ways directory not found:", WAYS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(WAYS_DIR).filter(f => f.endsWith(".geojson"));
  const linkFiles = files.filter(f => f.endsWith("_link.geojson"));

  let mergedCount = 0;
  for (const linkFile of linkFiles) {
    const baseName = linkFile.replace(/_link\.geojson$/i, "");
    const baseFile = `${baseName}.geojson`;

    const basePath = path.join(WAYS_DIR, baseFile);
    const linkPath = path.join(WAYS_DIR, linkFile);

    const baseGJ = readGeojson(basePath) || { type: "FeatureCollection", features: [] };
    const linkGJ = readGeojson(linkPath);
    if (!linkGJ) continue;

    const merged = {
      type: "FeatureCollection",
      features: [...baseGJ.features, ...linkGJ.features]
    };

    writeGeojson(basePath, merged);
    fs.unlinkSync(linkPath);
    mergedCount += 1;
  }

  console.log(`Merged ${mergedCount} *_link.geojson files into their base files.`);
}

main();
