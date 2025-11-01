import { esri } from "../mainCtrl/esri";
import { serverCtrl } from "../serverCtrl/serverCtrl";
export const mapCtrl = {};
const viewBox = {};
const homeBox = {};
const basemapBox = {};
const compassBox = {};
const fullScreenBox = {};
/**
 * 创建地图视图
 * @param mapId div的id,亦是要生成地图的id;
 * @param config 配置 可选 不传加载3D灰色球体地图,传object自定义配置
 *         config={
 *         sceneType:"global",   //global球体 local平面三维
 *         basemap:["gray"],  //数组,默认加载第一个; 传入服务控制器中注册的图层名称，仅支持TileLayer与VectorTileServer
 *         }
 * @returns  promise
 */
mapCtrl.createMap = function(mapId, config) {
  let p = new Promise((resolve, reject) => {
    //默认值处理
    let map, view;
    //let mapPropertys=["basemap","ground"];
    let viewPropertys = [
      "allLayerViews",
      "alphaCompositingEnabled",
      "animation",
      "breakpoints",
      "camera",
      "center",
      "clippingArea",
      "constraints",
      "container",
      "declaredClass",
      "environment",
      "extent",
      "fatalError",
      "focused",
      "graphics",
      "groundView",
      "height",
      "heightBreakpoint",
      "highlightOptions",
      "input",
      "interacting",
      "layerViews",
      "map",
      "navigation",
      "orientation",
      "padding",
      "popup",
      "qualityProfile",
      "ready",
      "resizing",
      "resolution",
      "scale",
      "size",
      "spatialReference",
      "stationary",
      "suspended",
      "timeExtent",
      "type",
      "ui",
      "updating",
      "viewingMode",
      "viewpoint",
      "width",
      "widthBreakpoint",
      "zoom"
    ];
    let sceneType = config && config.sceneType ? config.sceneType : "global";
    if (mapId == null) {
      alert("请传入地图容器id");
      return;
    }
    //默认值处理  end

    //底图处理
    if (config && config.basemap) {
      //判断是否传入
      let cacheContainer = [];
      for (let i = 0; i < config.basemap.length; i++) {
        if (serverCtrl.getServerConfig(config.basemap[i]) && serverCtrl.getServerConfig(config.basemap[i]).url != null) {
          let serverConfig = serverCtrl.getServerConfig(config.basemap[i]);
          let layer;
          if (serverConfig.type == "TileLayer") {
            //服务控制器中取地址
            layer = new esri.TileLayer({
              url: serverConfig.url
            });
          } else if (serverConfig.type == "VectorTileServer") {
            layer = new esri.VectorTileLayer({
              url: serverConfig.url
            });
          } else {
            console.log("图层" + config.basemap[i] + "不是底图支持的类型");
          }
          let cacheBasemap = new esri.Basemap({
            id: serverConfig.layerName,
            baseLayers: [layer]
          });
          cacheContainer.push(cacheBasemap);
        } else {
          console.log(config.basemap[i] + "不是有效的底图配置服务");
        }
      }

      basemapBox[mapId] = cacheContainer;
    } else {
      //未传入
      console.log("未指定地图的底图：" + mapId);
      basemapBox[mapId] = [];
    }
    let basemap = basemapBox[mapId][0];

    if (basemap) {
      map = new esri.Map({ basemap: basemap });
    } else {
      // streets
      // topo
      // satellite
      // hybrid
      // gray
      // dark-gray
      // national-geographic
      // oceans
      // osm
      map = new esri.Map({ basemap: "dark-gray-vector" });
    }
    //底图处理  end

    //生成地图容器
    // let dom = document.createElement("div");
    // dom.id = mapId + "container";
    // dom.style.cssText = "padding:0;margin:0;height: 100%;width:100%;";
    // document.getElementById(mapId).appendChild(dom);

    //仅提供SceneView使用
    view = new esri.SceneView({
      map: map,
      container: mapId,
      viewingMode: sceneType,
      qualityProfile: "low"
    });
    let conPropertys = config ? Object.keys(config) : [];
    // let viewPropertys = view ? Object.keys(view) : [];
    for (let i = 0; i < conPropertys.length; i++) {
      for (let j = 0; j < viewPropertys.length; j++) {
        if (conPropertys[i] == viewPropertys[j]) {
          view[conPropertys[i]] = config[conPropertys[i]];
        }
      }
    }
    view.map.ground.surfaceColor = "#004c73";

    view.ui.components = [];
    view.mapId = mapId;
    //加载完成
    view.when(
      function() {
        compassBox[mapId] = new esri.CompassViewModel({ view: view });
        homeBox[mapId] = new esri.HomeViewModel({ view: view });
        fullScreenBox[mapId] = new esri.FullscreenViewModel({ view: view });
        viewBox[mapId] = view;

        // clayglCtrl.init(view, mapId);
        fullScreenBox[mapId].watch("state", function(newValue, oldValue, propertyName, target) {
          view.container.style.height = "100%";
          view.container.style.width = "100%";
        });

        resolve(view);
      },
      function(error) {
        // This function will execute if the promise is rejected due to an error
        reject(error);
      }
    );
    //加载完成 end
  });
  return p;
};

/**
 * 创建地图视图 二维 三维 开发包内部使用
 * @param mapId div的id,亦是要生成地图的id;
 * @param config 配置 可选 不传加载3D灰色球体地图,传object自定义配置
 *         config={
 *         viewType:"sceneView",    //mapView 二维  sceneView 三维
 *         sceneType:"global",   //选择sceneView情况下的场景模式 global球体 local平面三维
 *         basemap:["gray"],  //数组,默认加载第一个; 传入服务控制器中注册的图层名称，仅支持TileLayer与VectorTileServer
 *         }
 * @returns  promise
 */
export const __createMap = function(mapId, config) {
  let p = new Promise((resolve, reject) => {
    //默认值处理
    let map, view;
    let viewType = config && config.mapType ? config.mapType : "sceneView";
    let sceneType = config && config.sceneType ? config.sceneType : "global";
    if (mapId == null) {
      alert("请传入地图容器id");
      return;
    }
    //默认值处理  end

    //底图处理
    if (config && config.basemap) {
      //判断是否传入
      let cacheContainer = [];
      for (let i = 0; i < config.basemap.length; i++) {
        if (serverCtrl.getServerConfig(config.basemap[i]) && serverCtrl.getServerConfig(config.basemap[i]).url != null) {
          let serverConfig = serverCtrl.getServerConfig(config.basemap[i]);
          let layer;
          if (serverConfig.type == "TileLayer") {
            //服务控制器中取地址
            layer = new esri.TileLayer({
              url: serverConfig.url
            });
          } else if (serverConfig.type == "VectorTileLayer") {
            layer = new esri.VectorTileLayer({
              url: serverConfig.url
            });
          }
          let cacheBasemap = new esri.Basemap({
            id: serverConfig.layerName,
            baseLayers: [layer]
          });
          cacheContainer.push(cacheBasemap);
        } else {
          console.log(config.basemap[i] + "不是有效的底图配置服务");
        }
      }

      basemapBox[mapId] = cacheContainer;
    } else {
      //未传入
      console.log("未指定地图的底图：" + mapId);
      basemapBox[mapId] = ["dark-gray-vector"];
    }
    let basemap = basemapBox[mapId][0];
    console.log("使用底图", basemap);
    map = new esri.Map({ basemap: basemap });
    //底图处理  end

    //生成地图容器
    let dom = document.createElement("div");
    dom.id = mapId + "container";
    dom.style.cssText = "padding:0;margin:0;height: 100%;width:100%;";
    document.getElementById(mapId).appendChild(dom);

    //view 判断
    if (viewType == "sceneView") {
      view = new esri.SceneView({
        map: map,
        container: dom.id,
        viewingMode: sceneType
      });
      view.map.ground.surfaceColor = "#004c73";
    } else if (viewType == "mapView") {
      view = new esri.MapView({ map: map, container: dom.id });
    } else {
      alert("请检查viewType参数");
      return;
    }
    //view 判断    end
    view.ui.components = [];
    view.mapId = mapId;
    //加载完成
    view.when(
      function() {
        compassBox[mapId] = new esri.CompassViewModel({ view: view });
        homeBox[mapId] = new esri.HomeViewModel({ view: view });
        fullScreenBox[mapId] = new esri.FullscreenViewModel({ view: view });
        viewBox[mapId] = view;

        if (view.type == "3d") {
          //clayglCtrl.init(view, mapId);
          fullScreenBox[mapId].watch("state", function(newValue, oldValue, propertyName, target) {
            view.container.style.height = "100%";
            view.container.style.width = "100%";
          });
        }
        resolve(view);
      },
      function(error) {
        // This function will execute if the promise is rejected due to an error
        reject(error);
      }
    );
    //加载完成 end
  });
  return p;
};

/**
 * 切换地图底图
 * @param mapId 要切换地图的id;
 * @param basemapIndex 要切换的底图序号
 * @returns  none
 */
mapCtrl.changeBasemap = function(mapId, basemapIndex) {
  mapCtrl.getView(mapId).map.basemap = basemapBox[mapId][basemapIndex];
};

/**
 * 获取地图底图列表
 * @param mapId 要获取地图的id;
 * @returns  object
 */
mapCtrl.getBasemap = function(mapId) {
  return basemapBox[mapId];
};

/**
 * 获取单个地图view
 * @param mapId 要获取地图view名称
 * @returns  View
 */
mapCtrl.getView = function(mapId) {
  if (viewBox[mapId]) {
    return viewBox[mapId];
  } else {
    console.log("未找到view:" + mapId);
  }
};

/**
 * 获取全部地图view
 * @returns  object View容器对象
 */
mapCtrl.getAllView = function() {
  return viewBox;
};

// /**
//  * 切换地图全屏状态
//  * @param mapId 要切换地图的id;
//  * @param state 开关状态,空值为切换现有状态
//  * @returns  none
//  */
// mapCtrl.changeFullScreen = function(mapId, state) {
//   let fullScreen = fullScreenBox[mapId];
//   if (!fullScreen) {
//     console.log("请检查mapId");
//   }
//   if (state == true) {
//     fullScreen.enter();
//   } else if (state == false) {
//     fullScreen.exit();
//   } else {
//     fullScreen.toggle();
//   }
// };
//
// /**
//  * 切换二三维状态
//  * @param mapId 要切换地图的id;
//  * @param state  true为3D，false2D
//  * @returns  none
//  */
// mapCtrl.change23D = function(mapId, state) {
//   let view = mapCtrl.getView(mapId);
//   if (state) {
//     let constraints3d = {
//       tilt: { max: 90 }
//     };
//     view.constraints = constraints3d;
//     view.goTo({ tilt: 45, heading: 0 });
//   } else if (state == false) {
//     let constraints2d = {
//       tilt: { max: 0 }
//     };
//     view.constraints = constraints2d;
//     view.goTo({ tilt: 0, heading: 0 });
//   }
// };
//
// /**
//  * 地图缩放控制
//  * @param mapId 要缩放地图的id;
//  * @param type 缩放类型,true 放大,false 缩小,默认放大
//  * @returns  none
//  */
// mapCtrl.zoom = function(mapId, state) {
//   let view = mapCtrl.getView(mapId);
//   let zoom = new esri.ZoomViewModel({
//     view: view
//   });
//   if (state == true) {
//     zoom.zoomIn();
//   } else if (state == false) {
//     zoom.zoomOut();
//   } else {
//     zoom.zoomIn();
//   }
//   zoom = null;
// };
//
// /**
//  * 地图初始还原
//  * @param mapId 要还原地图的id;
//  * @returns  none
//  */
// mapCtrl.home = function(mapId) {
//   let home = homeBox[mapId];
//   if (home) {
//     home.go();
//   } else {
//     console.log("请检查mapId");
//   }
// };
//
// /**
//  * 北方向还原
//  * @param mapId 要还原地图的id;
//  * @returns  none
//  */
// mapCtrl.compassReset = function(mapId) {
//   let compass = compassBox[mapId];
//   compass.reset();
// };
