import axios from "axios";
import { mainCtrl } from "../mainCtrl/mainCtrl";
export const serverCtrl = {};
const serverBox = {};

/**
 * 从JSON对象加载服务配置
 * @param serverConfig 配置对象数组 []
 *          layerName:必选 图层名称
 *          url:必选 图层地址
 *          type:必选 图层类型
 *         serverConfig=[
 *             {"layerName":"physical", "url":"http://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer","type":"MapServer"},
 *              {"layerName":"blue", "url":"http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"},
 *         ]
 * @returns  none
 */
serverCtrl.addConfig = function(serverConfig) {
  if (serverConfig && serverConfig.length != 0) {
    for (let i = 0; i < serverConfig.length; i++) {
      serverBox[serverConfig[i]["layerName"]] = serverConfig[i];
    }
    console.log("服务配置加载完成");
  } else {
    console.log("请传入正确的配置对象");
  }
};

/**
 * 获取单个服务配置
 * @param layerName 要获取服务名称
 * @returns  object 图层配置对象
 */
serverCtrl.getServerConfig = function(layerName) {
  if (serverBox[layerName] != null) {
    return serverBox[layerName];
  } else {
    console.log("服务配置未找到，请检查:" + layerName);
  }
};

/**
 * 获取全部服务配置
 * @param layerName 要获取服务名称
 * @returns  object 图层配置对象
 */
serverCtrl.getAllServerConfig = function() {
  return serverBox;
};
