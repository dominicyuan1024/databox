import { esri } from "../mainCtrl/esri";

export const geoCreater = {};

/**
 * 创建几何点
 * @param config  配置
 * @returns  Point
 */
geoCreater.point = function(config) {
  let point = new esri.Point(config);
  return point;
};

/**
 * 创建几何多边形
 * @param config  配置
 * @returns  Polygon
 */
// geoCreater.polygon = function(config) {
//   let polygon = new esri.Polygon(config);
//   return polygon;
// };

/**
 * 创建几何线
 * @param config  配置
 * @returns  Polyline
 */
geoCreater.polyline = function(config) {
  let polyline = new esri.Polyline(config);
  return polyline;
};

/**
 * 创建几何圆
 * @param config  配置
 * @returns  Circle
 */
// geoCreater.circle = function(config) {
//   let circle = new esri.Circle(config);
//   return circle;
// };

/**
 * 创建范围
 * @param config  配置
 * @returns  Extent
 */
geoCreater.extent = function(config) {
  let extent = new esri.Extent(config);
  return extent;
};
