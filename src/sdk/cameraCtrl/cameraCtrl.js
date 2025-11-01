import { LOG } from "../log/LOG.js";
const log = new LOG("cameraCtrl.js");
import { esri } from "../mainCtrl/esri.js";
import { mapCtrl } from "../mapCtrl/mapCtrl.js";
import { layerCtrl } from "../layerCtrl/layerCtrl.js";
export const cameraCtrl = {};
cameraCtrl.cameraContainer = {};
const defaultCf = {
  // XY: [500, 500],
  // zoom: 8,
  // heading: 55,
  // tilt: 100,
  // camera: {
  //   position: [10, 542, 300],
  //   heading: 155,
  //   tilt: -100
  // },
  // get geo() {
  //   return this._geo_ || (this._geo_ = new esri.Point(this.XY));
  // },
  // get gra(){
  //   return this._gra_ || (this._gra_ = new esri.Graphic({geometry:this.geo}));
  // },
  // get extent() {
  //   return (
  //     this._extent_ ||
  //     (this._extent_ = new esri.Extent({
  //       xmax: 600,
  //       xmin: 300,
  //       ymax: 200,
  //       ymin: 10,
  //       spatialReference: { wkid: 102100 }
  //     }))
  //   );
  // }
  // layerName:null,
  // VP:null
  // fly:null,
  // opts: {duration:5000}
};
/**
 * 地图视域切换到指定坐标
 * @param mapId  String 地图id
 * @param XY  [longitude, latitude]  要切换到的坐标
 * @param opts?  { animate:Boolean, duration:Number, easing:String|Function } 过渡效果设置
 *               animate 是否启用过渡
 *               duration 过渡时间
 *               easing: linear | ease | ease-in | ease-out | ease-in-out  过渡速度函数
 * @returns  Promise
 */
cameraCtrl.toXY = function(mapId, XY = defaultCf.XY, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  if (XY instanceof Array) {
    XY = XY.map(item => item * 1);
  } else {
    log.e("参数XY必须是一个数组，当前是", XY);
  }
  return view.goTo(XY, opts);
};
/**
 * 地图视域切换到指定geometry
 * @param mapId  String 地图id
 * @param geo  esri.Geometry | [esri.Geometry]  要切换到的geometry或者geometry数组
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toGeo = function(mapId, geo = defaultCf.geo, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  return view.goTo(geo, opts);
};
/**
 * 地图视域切换到指定graphic
 * @param mapId  String 地图id
 * @param gra  esri.Graphic | [esri.Graphic]  要切换到的graphic或者graphic数组
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toGra = function(mapId, gra = defaultCf.gra, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  let geos;
  if (gra instanceof Array) geos = gra.map(g => g.geometry);
  geos = geos ? geos : gra.geometry;

  return view.goTo(geos, opts);
};
/**
 * 地图视域切换到指定水平方向（东南西北）设置
 * @param mapId  String 地图id
 * @param heading  Number 水平角度
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toHeading = function(mapId, heading = defaultCf.heading, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  if (view.type === "2d") {
    view.rotation = heading;
    return Promise.resolve();
  }
  return view.goTo({ heading }, opts);
};
/**
 * 地图视域切换到指定垂直方向（倾斜角/俯仰角度）设置
 * @param mapId  String 地图id
 * @param tilt  Number 俯仰角度
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toTilt = function(mapId, tilt = defaultCf.tilt, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  if (view && view.type !== "3d") {
    log.d(mapId + "是二维地图，没有俯仰角特性，使用toTilt不会有变化");
    return Promise.resolve();
  }
  return view.goTo({ tilt }, opts);
};
/**
 * 地图视域切换到指定zoom设置
 * @param mapId  String 地图id
 * @param zoom  Number zoom层级
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toZoom = function(mapId, zoom = defaultCf.zoom, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  return view.goTo({ zoom }, opts);
};
/**
 * 地图视域切换到指定extent设置
 * @param mapId  String 地图id
 * @param extent  esri.Extent | {xmin,ymin,xmax,ymax,spatialReference} 地图的extent
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toExtent = function(mapId, extent = defaultCf.extent, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  return view.goTo(extent, opts);
};
/**
 * 地图视域切换到指定camera设置
 * @param mapId  String 地图id
 * @param camera esri.Camera |
 * {
 *    position:[x,y,z],
 *    heading:Number,
 *    tilt:Number,
 * }
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toCamera = function(mapId, camera = defaultCf.camera, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  if (view.type !== "3d") {
    log.d(mapId + "是二维地图，没有camera特性，使用toCamera不会有变化");
    return Promise.resolve();
  }
  if (camera instanceof esri.Camera) return view.goTo(camera, opts);
  let myCm = new esri.Camera(camera);
  return view.goTo(myCm, opts);
};

/**
 * 地图视域切换到指定图层的可视范围
 * @param mapId  String 地图id
 * @param layerName  图层名称
 * @param opts? 参照 cameraCtrl.toXY 的参数说明
 * @returns  Promise
 */
cameraCtrl.toLayer = function(mapId, layerName, opts = defaultCf.opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  let target = layerCtrl.getLayer(mapId, layerName);
  if (!target) return Promise.reject(log.e(`找不到layerName为${layerName}的图层对象`));
  if (target.fullExtent) return view.goTo(target.fullExtent, opts);
  return new Promise((rs, rj) => {
    let handle = target.on("layerview-create", event => {
      handle.remove();
      let layer = event.layerView.layer;
      view.goTo(layer.fullExtent, opts).then(res => rs(res), err => rj(err));
    });
  });
};

/**
 * 地图视域按指定的设置连续切换
 * @param mapId  String 地图id
 * @param points 坐标集合 [[x,y,z],[x,y,z]]
 * @param opts   参照代码注释 {duration,easing,minDistance,dev,step}
 * @returns  Promise
 */
cameraCtrl.byPath = function(mapId, points, opts) {
  let view = mapCtrl.getView(mapId);
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  if (!points.length) return Promise.reject(log.e(`请传入镜头飞行路径坐标！`));
  let {
    animate = true, // 是否过渡
    duration = 2000, // 插值后的两点过渡时间 默认 2000毫秒  可计算速度  minDistance/duration
    easing = "linear", // 镜头过渡函数，默认linear是匀速
    minDistance = 20, // 两点间插值的最小间隔 默认 20
    tilt = 90,
    dev = false, // 调试模式 如果为true 展示轨迹点 输出计算日志
    step // 每个点的回调函数
  } = opts;
  let cameraOpt = { duration, easing, animate };
  if (!view) return Promise.reject(log.e(`找不到mapId为${mapId}的底图对象`));
  let geo = new esri.Polyline({ paths: points });
  // 细分插值
  dev && console.time("插值");
  geo = esri.geometryEngine.geodesicDensify(geo, minDistance);
  dev && console.timeEnd("插值");
  //计算前进方向
  dev && console.time("方向计算");
  let path = geo.paths[0];
  let hts = path.map((item, index) => {
    let endPoint = path[index + 1];
    if (!endPoint) return;
    let dis = esri.geodesicUtils.geodesicDistance(new esri.Point({ x: item[0], y: item[1], z: item[2] }), new esri.Point({ x: endPoint[0], y: endPoint[1], z: endPoint[2] }));
    return { heading: dis.azimuth };
  });
  dev && console.timeEnd("方向计算");
  // 调试模式，渲染传入的路径点坐标
  if (dev) {
    console.time("渲染轨迹");
    renderPoints(view, path);
    console.timeEnd("渲染轨迹");
    console.log("轨迹点数量：" + path.length);
  }
  // 逐个飞行
  return (async function() {
    for (var i = 0; i < path.length; i++) {
      await view.goTo(
        {
          heading: hts[i] && hts[i].heading,
          position: { x: path[i][0], y: path[i][1], z: path[i][2] },
          tilt: tilt
        },
        cameraOpt
      );
      step instanceof Function && step(i, path, hts);
    }
  })();
};

function renderPoints(view, path) {
  let sym = {
    type: "simple-marker",
    color: [226, 0, 0]
  };
  path.forEach(item => {
    let grap = new esri.Graphic({
      geometry: {
        type: "point",
        x: item[0],
        y: item[1],
        z: item[2]
      },
      symbol: sym
    });
    view.graphics.add(grap);
  });
}
