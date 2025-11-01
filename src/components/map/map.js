import Config from "../../app.config.js";
import { areasLoad } from "./layer.js";
import { fw } from "../../sdk/index.js";

export function addLayer(map) {
  // const close = true;
  // if (close) return;
  const mapId = Config.mapConfigs[0].id;
  if (map.id !== mapId) return;
  areasLoad();
  setTimeout(() => {
    initCamera();
  }, 1000);
}

export function initCamera() {
  const mapId = Config.mapConfigs[0].id;
  if (!fw.mapCtrl.getView(mapId)) return;
  fw.cameraCtrl.toCamera(
    mapId,
    { position: { spatialReference: { latestWkid: 3857, wkid: 102100 }, x: 12710392.014070354, y: 2580161.0790796448, z: 238490.13518808037 }, heading: 0, tilt: 0.48197753469185306 },
    { animate: true, duration: 1000 }
  );
}
