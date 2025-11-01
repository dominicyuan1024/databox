import { esri } from "../mainCtrl/esri";
// layerConfig:{
//   url:"",
//   copyright:"",
// }
export const geoJSONLayerGeter = function(layerConfig) {
  let layer = new esri.GeoJSONLayer(layerConfig);
  return layer;
};
