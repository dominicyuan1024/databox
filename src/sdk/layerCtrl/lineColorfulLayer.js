import { esri } from "../mainCtrl/esri";
export class LineColorfulLayer {
  constructor(geojson, options = {}) {
    this.options = Object.assign(
      {
        // 线宽
        lineWidth: 2
      },
      options
    );

    // 本次绘制只创建一个动画layer
    this.animationLayer = null;
    this.animations = [];
    this.allLines = [];
    this._rafId = null;

    // 为同名线条复用同一颜色
    this._colorMap = {};
    this._usedColors = [];

    this.GraphicsLayer = esri.GraphicsLayer;
    this.SimpleLineSymbol = esri.SimpleLineSymbol;
    this.Graphic = esri.Graphic;
    this.Polyline = esri.Polyline;
    this.Color = esri.Color;
    this.array = esri.array;
    // 只加动画图层
    this.baseLinesLayer = new esri.GraphicsLayer();
    this._createLinesFromGeoJSON(geojson);
    this._createBaseLines();
    return this.baseLinesLayer;
  }

  // 内部方法：从 GeoJSON 数据创建线路
  _createLinesFromGeoJSON(geojsonData) {
    if (!this.baseLinesLayer) {
      console.error("图层尚未初始化完成，请稍后重试");
      return 0;
    }
    this.allLines = [];

    // 清空 colorMap
    this._colorMap = {};
    this._usedColors = [];
    // 生成新颜色
    function genColorHex() {
      // 随机亮色
      const h = Math.floor(Math.random() * 360);
      const s = 70 + Math.floor(Math.random() * 20);
      const l = 50 + Math.floor(Math.random() * 10);
      // hsl to rgb
      function hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
      }
      let rgb = hslToRgb(h, s, l);
      return rgb;
    }
    // name->color rgb 映射
    const getColor = name => {
      if (!name) name = "";
      if (!this._colorMap[name]) {
        let color = genColorHex();
        this._colorMap[name] = color;
        this._usedColors.push(color);
      }
      return this._colorMap[name];
    };
    let lineId = 0;
    if (geojsonData.type === "FeatureCollection") {
      geojsonData.features.forEach((feature, index) => {
        if (!feature.geometry) return;
        const geom = feature.geometry;
        // 兼容LineString
        if (geom.type === "LineString") {
          const path = geom.coordinates.map(coord => [coord[0], coord[1]]);
          const name = feature.properties && feature.properties.name ? feature.properties.name : "";
          const color = getColor(name);
          const line = {
            id: lineId++,
            name: name,
            path: path,
            color: new this.Color([...color, 0.85]),
            width: this.options.lineWidth
          };
          this.allLines.push(line);
        } else if (geom.type === "MultiLineString") {
          const name = feature.properties && feature.properties.name ? feature.properties.name : "";
          const color = getColor(name);
          for (const singleLine of geom.coordinates) {
            const path = singleLine.map(coord => [coord[0], coord[1]]);
            const line = {
              id: lineId++,
              name: name,
              path: path,
              color: new this.Color([...color, 0.85]),
              width: this.options.lineWidth
            };
            this.allLines.push(line);
          }
        }
      });
    }
    return this.allLines.length;
  }

  // 内部方法：创建基础线条（完整线路，半透明显示）
  _createBaseLines() {
    this.array.forEach(this.allLines, line => {
      const baseSymbol = new this.SimpleLineSymbol({
        color: line.color,
        width: line.width
      });

      const baseGraphic = new this.Graphic({
        geometry: new this.Polyline({
          paths: [line.path]
        }),
        symbol: baseSymbol,
        attributes: {
          id: line.id,
          name: line.name
        },
        popupTemplate: {
          content: `<div style="padding: 1rem;"><p>名称：{name}</p></div>`
        }
      });

      this.baseLinesLayer.add(baseGraphic);
    });
  }
}
