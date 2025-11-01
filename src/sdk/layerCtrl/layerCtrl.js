import { serverCtrl } from "../serverCtrl/serverCtrl.js";
import { eventCtrl } from "../mainCtrl/eventCtrl.js";
// import { mapImageLayerGeter } from "./mapImageLayerGeter";
import { featureLayerGeter } from "./featureLayerGeter.js";
import { tileLayerGeter } from "./tileLayerGeter.js";
// import { graphicsLayerGeter } from "./graphicLayerGeter";
import { geoJSONLayerGeter } from "./geoJSONLayerGeter.js";
// import { csvLayerGeter } from "./csvLayerGeter.js";
import { vectorTileLayerGeter } from "./vectorTileLayer.js";
import { sceneLayerGeter } from "./sceneLayerGeter.js";
// import { buildingSceneLayerGeter } from "./buildingSceneLayerGeter";
// import { WMTSLayerGeter } from "./WMTSLayerGeter";
// import { webTileLayerGeter } from "./webTileLayerGeter";
// import { WMSLayerGeter } from "./WMSLayerGeter";
import { LineColorfulLayer } from "./lineColorfulLayer.js";
import { EchartsArcGISLayer } from "./echartsLayer.js";
import { mapCtrl } from "../mapCtrl/mapCtrl.js";
import { esri } from "../mainCtrl/esri.js";

export const layerCtrl = {};
const layerBox = {};
/**
 * 从服务创建图层
 * @param mapId  地图ID
 * @param layerName 服务控制器中注册的图层名
 * @param layerConfig 图层配置
 */
layerCtrl.createFromServer = function(mapId, layerName, layerConfig) {
  let serverConfig = serverCtrl.getServerConfig(layerName);
  if (!serverConfig) {
    return;
  }
  let config = layerConfig || {};
  if (serverConfig.url) config.url = serverConfig.url;
  let layer;
  switch (serverConfig.type) {
    // case "MapServer":
    //   layer = mapImageLayerGeter(config);
    //   break;
    case "FeatureServer":
      layer = featureLayerGeter(config);
      break;
    case "TileLayer":
      layer = tileLayerGeter(config);
      break;
    case "GeoJSONLayer":
      layer = geoJSONLayerGeter(config);
      break;
    // case "CsvLayer":
    //   layer = csvLayerGeter(config);
    //   break;
    case "VectorTileServer":
      layer = vectorTileLayerGeter(config);
      break;
    case "SceneServer":
      layer = sceneLayerGeter(config);
      break;
    // case "BuildingSceneLayer":
    //   layer = buildingSceneLayerGeter(config);
    //   break;
    // case "WMTSLayer":
    //   layer = WMTSLayerGeter(config);
    //   break;
    // case "WebTileLayer":
    //   config.urlTemplate = serverConfig.url + "/{level}/{row}/{col}";
    //   layer = webTileLayerGeter(config);
    //   break;
    // case "WMSLayer":
    //   layer = WMSLayerGeter(config);
    //   break;
  }
  layer.name = layerName;
  console.log("debug", "addToMap", layerName);
  addToMap(mapId, layer, layerName);
  return layer;
};

/**
 * 创建要素图层
 * @param mapId  地图ID
 * @param layerName 自定义要素图层名
 * @param layerConfig 图层配置
 */
layerCtrl.createGraphicsLayer = function(mapId, layerName, layerConfig) {
  let config = layerConfig || {};
  let layer = new esri.GraphicsLayer(config);
  addToMap(mapId, layer, layerName);
  return layer;
};

layerCtrl.createLineColorfulLayer = function(mapId, layerName, geojsonData) {
  let layer = new LineColorfulLayer(geojsonData, {});
  addToMap(mapId, layer, layerName);
  return layer;
};

/**
 * 创建ECharts图层
 * @param mapId  地图ID
 * @param layerName 图层名
 * @param echartsOptions  ECharts配置
 */
layerCtrl.createEchartsLayer = function(mapId, layerName, echartsOptions) {
  const layer = new EchartsArcGISLayer(mapId, layerName, echartsOptions);
  addToMap(mapId, layer, layerName);
  return layer;
};

/**
 * 关闭图层
 * @param mapId  图层所在地图ID
 * @param layerName 图层名
 * @returns  none
 */
layerCtrl.closeLayer = function(mapId, layerName) {
  let layer = layerCtrl.getLayer(mapId, layerName);
  if (layer) {
    if (layer.type == "echart") {
      layer.remove();
    } else {
      let map = mapCtrl.getView(mapId).map;
      map.remove(layer);
    }
    delete layerBox[mapId][layerName];
  }
  eventCtrl.emit("layerList_change", layerName, "remove");
};

/**
 * 获取图层
 * @param mapId  图层所在地图ID
 * @param layerName 图层名
 * @returns  layer
 */
layerCtrl.getLayer = function(mapId, layerName) {
  if (layerCtrl.hasLayer(mapId, layerName)) {
    let layer = layerBox[mapId][layerName];
    return layer;
  } else {
    console.log("未找到" + mapId + "上的图层:" + layerName);
    return null;
  }
};

/**
 * 获取全部图层
 * @param mapId  要获取图层的地图ID
 * @returns  layer
 */
layerCtrl.getAllLayer = function(mapId) {
  if (layerBox[mapId]) {
    return layerBox[mapId];
  } else {
    console.log("未找到" + mapId + "上的图层");
    return null;
  }
};

/**
 * 判断存在图层
 * @param mapId  图层所在地图ID
 * @param layerName 图层名
 * @returns  boolean
 */
layerCtrl.hasLayer = function(mapId, layerName) {
  if (layerBox[mapId] && layerBox[mapId][layerName]) {
    return true;
  } else {
    return false;
  }
};

function addToMap(mapId, layer, layerName) {
  if (!layerBox[mapId]) {
    layerBox[mapId] = {};
  }
  if (layerBox[mapId][layerName]) {
    return;
  }
  layerBox[mapId][layerName] = layer;
  if (layer.type != "echart") {
    let map = mapCtrl.getView(mapId).map;
    console.log("debug", "add", layerName);
    map.add(layer);
  }
  console.log("debug", "layerList_change", layerName);
  eventCtrl.emit("layerList_change", layerName, "add");
  console.log(layerName + "创建加载完成");
}
