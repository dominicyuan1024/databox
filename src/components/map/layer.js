import axios from "axios";
import { fw } from "../../sdk/index.js";
import config from "../../app.config.js";

export function closeLayer(name) {
  const mapId = config.mapConfigs[0].id;
  fw.layerCtrl.closeLayer(mapId, name);
}

export const areas = "areas";
let isAreasFade = false;
const highlightHandles = [];
const areaOutLine = {
  color: [255, 255, 255, 0.5],
  width: 2
};
let _areasLayerViewCache = null;
export function areasLoad(clickCallback) {
  const mapId = config.mapConfigs[0].id;
  const labelClass = {
    labelExpressionInfo: {
      expression: "$feature.nick"
    },
    symbol: {
      type: "label-3d",
      symbolLayers: [
        {
          type: "text",
          material: { color: "white" },
          //   halo: { color: "white", size: 1 },
          size: 12
        }
      ],
      labelPlacement: "above-center"
    }
  };

  let areasLayer = fw.layerCtrl.createFromServer(mapId, areas, {
    labelingInfo: [labelClass],
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [255, 255, 255, 0.2],
        outline: areaOutLine
      }
    }
  });
  const view = fw.mapCtrl.getView(mapId);
  view.whenLayerView(areasLayer).then(function(lv) {
    _areasLayerViewCache = lv;
  });
  view.on("click", function(event) {
    // 执行 hitTest
    clearHighlightAreaFeature();
    view.hitTest(event).then(function(response) {
      let areaName = "";
      for (let index = 0; index < response.results.length; index++) {
        const element = response.results[index];
        if (element.graphic.layer.name === areas) {
          areaName = element.graphic.attributes.nick;
          !isAreasFade && highlightAreaFeature(areaName);
          break;
        }
      }
      fw.eventCtrl.emit("areasClick", areaName);
    });
  });
  // add view click event
}

// 高亮某个区域，并且使用系统默认的点击高亮样式，有没有什么 click 函数可以用的，或者配置 feature 的某个状态字段来实现？
export async function highlightAreaFeature(areaName) {
  clearHighlightAreaFeature();
  try {
    const view = fw.mapCtrl.getView(config.mapConfigs[0].id);
    const layer = fw.layerCtrl.getLayer(config.mapConfigs[0].id, areas);
    const layerView = await view.whenLayerView(layer);
    const result = await layerView.queryFeatures({
      where: `nick = '${areaName}'`
    });

    if (result.features.length > 0) {
      highlightHandles.push(layerView.highlight(result.features[0]));
      return result.features[0];
    }
    return null;
  } catch (error) {
    console.error("高亮失败:", error);
    return null;
  }
}

// clear highlight area feature
export function clearHighlightAreaFeature() {
  highlightHandles.forEach(handle => {
    handle.remove();
  });
  highlightHandles.length = 0;
}

// camera to layer
export function cameraToLayer(layerName) {
  const mapId = config.mapConfigs[0].id;
  fw.cameraCtrl.toLayer(mapId, layerName);
}

export function areasRecover() {
  console.log("debug areasRecover");
  const mapId = config.mapConfigs[0].id;
  const areasLayer = fw.layerCtrl.getLayer(mapId, areas);
  if (!areasLayer) {
    return;
  }
  // areasLayer.popupTemplate = {
  //   content: ""
  // };
  const renderer = areasLayer.renderer.clone();
  renderer.symbol.outline.width = 2;
  areasLayer.renderer = renderer;
  isAreasFade = false;
}

export function areasFade() {
  console.log("debug areasFade");
  const mapId = config.mapConfigs[0].id;
  const areasLayer = fw.layerCtrl.getLayer(mapId, areas);
  if (!areasLayer) {
    return;
  }
  areasLayer.popupTemplate = undefined;
  const renderer = areasLayer.renderer.clone();
  renderer.symbol.outline.width = 0;
  areasLayer.renderer = renderer;
  isAreasFade = true;
}

export const railways = "railways";
export function railwaysLoad() {
  const mapId = config.mapConfigs[0].id;
  fw.cameraCtrl.toLayer(mapId, areas);
  let SYLayer = fw.layerCtrl.createFromServer(mapId, railways, {
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [145, 255, 0, 1]
      }
    }
  });
  SYLayer.popupTemplate = {
    content: `<div style="padding: 1rem;"><p>名称：{name}</p> <p>类型：{fclass}</p></div>`
  };
}

export async function railwaysLoadColorful() {
  const mapId = config.mapConfigs[0].id;
  fw.cameraCtrl.toLayer(mapId, areas);
  const res = await axios.get("./map/shenzhen/railways.geojson");
  fw.layerCtrl.createLineColorfulLayer(mapId, railways, res.data);
}

export const rivers = "rivers";
export async function riversLoad2() {
  const mapId = config.mapConfigs[0].id;
  const res = await axios.get("./map/shenzhen/rivers.geojson");
  const gj = res.data;

  // Build ECharts lines data from GeoJSON
  const lines = [];
  if (gj && gj.type === "FeatureCollection" && Array.isArray(gj.features)) {
    gj.features.forEach(f => {
      if (!f.geometry) return;
      const g = f.geometry;
      if (g.type === "LineString") {
        lines.push({ coords: g.coordinates });
      } else if (g.type === "MultiLineString") {
        g.coordinates.forEach(part => lines.push({ coords: part }));
      }
    });
  }

  // Prefer GL if available, otherwise fallback to Canvas lines (避免影响其他页面的 ECharts 版本)
  // const hasGL = typeof window !== "undefined" && window.echarts && window.echarts.graphicGL;
  // const seriesType = hasGL ? "linesGL" : "lines";
  const seriesType = "lines";
  const echartsOptions = {
    series: [
      {
        type: seriesType,
        coordinateSystem: "arcgis",
        polyline: true,
        data: lines,
        lineStyle: { color: "#00eaff", width: 2, opacity: 0.8 },
        blendMode: "lighter",
        effect: {
          show: true,
          period: 4,
          trailLength: 0.2,
          symbolSize: 3,
          color: "#ffffff"
        },
        progressive: 4000,
        progressiveThreshold: 10000,
        silent: true
      }
    ],
    animation: false
  };
  console.log("createEchartsLayer rivers before");
  fw.layerCtrl.createEchartsLayer(mapId, rivers, echartsOptions);
  console.log("createEchartsLayer rivers after");
}
export function riversLoad() {
  const mapId = config.mapConfigs[0].id;
  fw.layerCtrl.createFromServer(mapId, rivers, {
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [0, 255, 255, 1]
      }
    }
  });
}

export const airports = "airports";
export async function airportsLoad(areaName = "白蛇区") {
  const mapId = config.mapConfigs[0].id;
  // if layer airports layer is already created, remove it first
  const airportsLayer = fw.layerCtrl.getLayer(mapId, airports);
  if (airportsLayer) {
    fw.layerCtrl.closeLayer(mapId, airports);
  }
  const res = await axios.get("./map/shenzhen/airports.geojson");
  const gj = res.data;
  // collect points
  const points = (gj.features || [])
    .map(f => ({
      name: (f.properties && (f.properties.nick || f.properties.name)) || "",
      coord: f.geometry && f.geometry.coordinates
    }))
    .filter(p => Array.isArray(p.coord) && p.coord.length === 2 && isFinite(+p.coord[0]) && isFinite(+p.coord[1]));

  // pair links from 白蛇区 to all other districts
  const lines = [];
  const startPoint = points.find(p => p.name === areaName);
  if (startPoint) {
    points.forEach(p => {
      if (p !== startPoint) {
        lines.push({ coords: [startPoint.coord, p.coord] });
      }
    });
  }

  // generate smooth upward arcs using quadratic-like interpolation (parabolic bump)
  function generateArc(a, b, segments, offsetFactor) {
    const n = segments || 24;
    const off = offsetFactor || 0.2;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const baseSpan = Math.max(Math.abs(dx), Math.abs(dy));
    const offset = off * baseSpan; // positive -> push northward
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      // linear lerp
      const x = a[0] + dx * t;
      const y = a[1] + dy * t;
      // bell curve bump 4t(1-t) in latitude to ensure upward convexity
      const bump = 4 * t * (1 - t) * offset;
      pts.push([x, y + bump]);
    }
    return pts;
  }

  const curvedLines = lines.map(l => ({ coords: generateArc(l.coords[0], l.coords[1], 28, 0.3) }));

  // debug
  // eslint-disable-next-line no-console
  console.log("airports points=", points.length, "lines=", lines.length);

  // plane svg path (from unvisible.vue)
  // const planePath ="path://M1136.047896 339.882267C1112.706905 143.149344 1017.345943-0.2756 900.268988 0.0004L358.6862 1.290399c-117.106954 0.276-211.762917 144.067944-234.275909 340.954867C42.146324 391.197247-0.27366 490.974208 0.00134 606.394163c0.184 85.699967 24.016991 162.533937 69.902973 216.394916l0.46 191.364925 212.804916-0.49-0.276-112.077956 697.337728-1.687 0.276 112.076957 212.805917-0.521-0.46-191.364925c45.639982-54.014979 69.134973-131.001949 68.919973-216.700916-0.245-115.205955-43.185983-214.890916-125.725951-263.506897zM358.9312 74.320371l541.583788-1.289c75.392971-0.184 141.491945 101.98596 166.489935 240.563907-11.532995-2.299999-23.648991-3.709999-36.193986-4.446999 0-0.307 0.338-0.92 0.062-0.889999-101.89396 0.246-70.055973 0.154-141.799944 0.337999s-46.559982 0.092-118.118954 0.276l-523.669796 1.257c-19.016993 0.031-36.990986 2.085999-53.983979 5.551998C217.807255 176.920331 283.538229 74.473371 358.9312 74.320371zM218.298255 702.030126c-46.590982 0.092-84.317967-42.7879";

  const echartConfigLines = [
    {
      coordinateSystem: "arcgis",
      type: "lines",
      polyline: true,
      data: curvedLines,
      lineStyle: { width: 5, opacity: 0.6, color: "rgba(255,255,255,0.2)" },
      progressiveThreshold: 500,
      progressive: 200,
      silent: true,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.4,
        color: "#3fa7ff",
        symbolSize: 10,
        opacity: 0.5
      }
      // effect: {
      //   show: true,
      //   period: 6,
      //   trailLength: 0,
      //   symbol: planePath,
      //   color: "#3fa7ff",
      //   symbolSize: 16,
      //   opacity: 0.9
      // }
    }
  ];

  const echartConfigPoints = {
    coordinateSystem: "arcgis",
    type: "effectScatter",
    data: points.map(p => [p.coord[0], p.coord[1]]),
    encode: { x: 0, y: 1 },
    showEffectOn: "render",
    rippleEffect: { brushType: "stroke", scale: 4, period: 10 },
    symbolSize: 8,
    itemStyle: { color: "rgba(63,167,255,0.2)" },
    hoverAnimation: true
  };

  const echartsOptions = { series: [...echartConfigLines, echartConfigPoints] };
  fw.layerCtrl.createEchartsLayer(mapId, airports, echartsOptions);
}

export const motorway = "motorway";
export function motorwayLoad() {
  const mapId = config.mapConfigs[0].id;
  let SYLayer = fw.layerCtrl.createFromServer(mapId, motorway, {
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [0, 145, 255, 1]
      }
    }
  });
  SYLayer.popupTemplate = {
    content: `<p style="padding: 1rem;">名称：{name}</p>`
  };
}

export const primary = "primary";
export function primaryLoad() {
  const mapId = config.mapConfigs[0].id;
  let SYLayer = fw.layerCtrl.createFromServer(mapId, primary, {
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [0, 145, 255, 1]
      }
    }
  });
  SYLayer.popupTemplate = {
    content: `<p style="padding: 1rem;">名称：{name}</p>`
  };
}

export const secondary = "secondary";
export function secondaryLoad() {
  const mapId = config.mapConfigs[0].id;
  let SYLayer = fw.layerCtrl.createFromServer(mapId, secondary, {
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [0, 145, 255, 1]
      }
    }
  });
  SYLayer.popupTemplate = {
    content: `<p style="padding: 1rem;">名称：{name}</p>`
  };
}
