import { esri } from "../mainCtrl/esri";

export const sceneLayerGeter = function(layerConfig) {
  let layer = new esri.SceneLayer(layerConfig);
  return layer;
};
