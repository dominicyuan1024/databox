import { esri } from "../mainCtrl/esri";
import { serverCtrl } from "../serverCtrl/serverCtrl";
import { mapCtrl } from "../mapCtrl/mapCtrl";
export const groundCtrl = {};

/**
 * 创建高程          新创建的图层添加到最上层
 * @param mapId 要创建地形的地图ID
 * @param layerName 服务控制器中注册的图层名,仅支持ground类型
 */
groundCtrl.createElevation = function(mapId, layerName) {
  let serverConfig = serverCtrl.getServerConfig(layerName);
  if (!serverConfig || serverConfig.type != "ElevationLayer") {
    console.log("图层名称不正确或图层不是ElevationLayer");
    return;
  }
  let elLayer = new esri.ElevationLayer(serverConfig.url);
  let map = mapCtrl.getView(mapId).map;
  map.ground.layers.add(elLayer);
};

/**
 * 设置地形透明度
 * @param mapId 要设置地形透明度的地图ID
 * @param opacity  透明度设置  0-1
 * @returns  none
 */
groundCtrl.changeOpacity = function(mapId, opacity) {
  let map = mapCtrl.getView(mapId).map;
  map.ground.opacity = opacity;
};

/**
 * 设置地形基础颜色
 * @param mapId 要设置地形基础颜色的地图ID
 * @param surfaceColor  颜色设置 16进制 '#004C73'
 * @returns  none
 */
groundCtrl.changeSurfaceColor = function(mapId, surfaceColor) {
  let map = mapCtrl.getView(mapId).map;
  map.ground.surfaceColor = surfaceColor;
};

/**
 * 设置开启地下导航模式
 * @param mapId 设置开启地下导航模式的地图ID
 * @param state  开启状态 默认关闭  true开启地下模式  false关闭
 * @returns  none
 */
groundCtrl.changeBelowGround = function(mapId, state) {
  let map = mapCtrl.getView(mapId).map;
  if (state) {
    map.ground.navigationConstraint = { type: "none" };
  } else {
    map.ground.navigationConstraint = { type: "stay-above" };
  }
};

//todo  显示隐藏地形图层、 关闭地形图层、地形图层顺序调整
