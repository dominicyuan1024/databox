import { esri } from "../mainCtrl/esri";

export const featureLayerGeter = function(layerConfig) {
  let layer = new esri.FeatureLayer(layerConfig);
  return layer;
};
