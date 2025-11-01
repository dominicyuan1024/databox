import { esri } from "../mainCtrl/esri";

export const tileLayerGeter = function(layerConfig) {
  let layer = new esri.TileLayer(layerConfig);
  return layer;
};
