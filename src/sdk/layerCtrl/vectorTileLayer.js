import { esri } from "../mainCtrl/esri";

export const vectorTileLayerGeter = function(layerConfig) {
  let layer = new esri.VectorTileLayer(layerConfig);
  return layer;
};
