import { esri } from "../mainCtrl/esri";
import { mapCtrl } from "../mapCtrl/mapCtrl";
import { eventCtrl } from "../mainCtrl/eventCtrl";

const aotoRefreshBox = {};

export const externalCtrl = {};

/**
 * 初始化外部渲染器引擎
 * @param mapId  地图ID
 */
externalCtrl.init = function(mapId) {
  let view = mapCtrl.getView(mapId);
  let myFirstExternalRenderer = {
    setup: function(context) {
      eventCtrl.emit(mapId + "ER-setup", context);
    },
    render: function(context) {
      eventCtrl.emit(mapId + "ER-render", context);
    }
  };
  esri.externalRenderers.add(view, myFirstExternalRenderer);
};

/**
 * 挂载渲染函数
 * @param mapId  地图ID
 * @param fun  要挂载的函数
 */
externalCtrl.mount = function(mapId, funName, fun) {
  eventCtrl.on(mapId + "ER-render", function(context) {
    fun(context);
  });
};

/**
 * 开启自动刷新
 * @param mapId  地图ID
 */
externalCtrl.aotoRefresh = function(mapId) {
  aotoRefreshBox[mapId] = function(context) {
    esri.externalRenderers.requestRender(context.view);
  };
  eventCtrl.on(mapId + "ER-render", aotoRefreshBox[mapId]);
};

/**
 * 关闭自动刷新
 * @param mapId  地图ID
 */
externalCtrl.closeRefresh = function(mapId) {
  if (aotoRefreshBox[mapId]) {
    eventCtrl.remove(mapId + "ER-render", aotoRefreshBox[mapId]);
    aotoRefreshBox[mapId] = null;
  }
};
