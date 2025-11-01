import { mapCtrl } from "../mapCtrl/mapCtrl";
import { esri } from "../mainCtrl/esri";

// Lightweight ECharts layer that overlays a DIV on top of ArcGIS view
// and registers a custom coordinate system to map [lng,lat] to screen.

export class EchartsArcGISLayer {
  constructor(mapId, layerName, echartsOptions) {
    this.type = "echart"; // important: layerCtrl.addToMap won't call map.add for this type
    this.layerName = layerName;
    this.mapId = mapId;
    this.view = mapCtrl.getView(mapId);
    this._container = null;
    this._chart = null;
    this._resizeObserver = null;
    this._options = echartsOptions || {};

    this._init();
  }

  _init() {
    if (!this.view || !this.view.container) return;

    // Create container overlay
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.top = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none"; // let map interactions pass through

    // Mount into view container (above map canvas)
    this.view.container.appendChild(container);
    this._container = container;

    // Init ECharts instance
    const echarts = window.echarts;
    if (!echarts) {
      // eslint-disable-next-line no-console
      console.error("ECharts not found on window. Please include echarts.min.js.");
      return;
    }

    // Register coordinate system once
    if (!echarts._arcgisCoordRegistered) {
      this._registerCoordinateSystem(echarts);
      echarts._arcgisCoordRegistered = true;
    }

    this._chart = echarts.init(container);
    this._setOption(this._options);

    // Sync on view events
    this._bindViewEvents();
  }

  _bindViewEvents() {
    const view = this.view;
    if (!view) return;

    // Resize
    const ro = new ResizeObserver(() => {
      if (this._chart) this._chart.resize();
    });
    ro.observe(view.container);
    this._resizeObserver = ro;

    // Hide while moving/zooming; show and sync when stationary
    this._stationaryWatcher = view.watch("stationary", isStationary => {
      if (!this._container) return;
      if (isStationary) {
        this._container.style.visibility = "visible";
        if (this._chart) this._chart.resize();
      } else {
        this._container.style.visibility = "hidden";
      }
    });

    // On extent/camera change, trigger re-render
    this._extentWatcher = view.watch("extent", () => {
      if (this._chart) this._chart.resize();
    });
  }

  _registerCoordinateSystem(echarts) {
    const view = this.view;
    const CoordSys = function(view) {
      this._view = view;
      this.dimensions = ["x", "y"]; // [x,y]
    };
    // ECharts expects static dimension info on coord system
    CoordSys.getDimensionsInfo = function() {
      return ["x", "y"];
    };
    CoordSys.dimensions = ["x", "y"];
    CoordSys.prototype.dimensions = ["x", "y"];
    CoordSys.prototype.setDimensions = function() {};
    CoordSys.prototype.setZoom = function() {};
    CoordSys.prototype.setCenter = function() {};
    CoordSys.prototype.dataToPoint = function(data) {
      // data: [lng, lat] in WGS84
      const lng = +data[0];
      const lat = +data[1];
      const sr = this._view.spatialReference;

      let x = lng;
      let y = lat;
      // If view is WebMercator (WKID 102100/3857), convert lon/lat to meters to avoid projectionUtils
      const wkid = sr && (sr.wkid || sr.latestWkid);
      const isWebMercator = wkid === 102100 || wkid === 3857;
      if (isWebMercator) {
        const originShift = 20037508.342789244;
        x = (lng * originShift) / 180;
        let yRad = (Math.PI / 180) * lat;
        y = Math.log(Math.tan(Math.PI / 4 + yRad / 2)) * (originShift / Math.PI);
        // clamp
        const max = originShift;
        if (y > max) y = max;
        if (y < -max) y = -max;
      }

      const point = new esri.Point({ x, y, spatialReference: sr });
      const pt = this._view.toScreen(point);
      return [pt.x, pt.y];
    };
    CoordSys.prototype.getViewRect = function() {
      const dom = this._view.container;
      return new echarts.graphic.BoundingRect(0, 0, dom.clientWidth, dom.clientHeight);
    };
    CoordSys.prototype.prepareCustoms = function() {
      return {
        coordSys: {
          type: "arcgis",
          x: 0,
          y: 0,
          width: this._view.container.clientWidth,
          height: this._view.container.clientHeight
        },
        api: {
          coord: data => this.dataToPoint(data)
        }
      };
    };

    // Register constructor (not an object). ECharts expects a coord sys class with static create.
    CoordSys.create = function(ecModel) {
      ecModel.eachSeries(function(seriesModel) {
        if (seriesModel.get("coordinateSystem") === "arcgis") {
          seriesModel.coordinateSystem = new CoordSys(view);
        }
      });
    };
    echarts.registerCoordinateSystem("arcgis", CoordSys);
  }

  _setOption(option) {
    if (!this._chart) return;
    // Inject our custom coord sys
    const patched = Object.assign({}, option);
    if (!patched || !Array.isArray(patched.series)) {
      // eslint-disable-next-line no-console
      console.error("EchartsArcGISLayer invalid option.series", patched);
      return;
    }
    if (Array.isArray(patched.series)) {
      patched.series = patched.series.map(s => ({
        coordinateSystem: "arcgis",
        animation: false,
        universalTransition: false,
        ...s
      }));
    }
    // disable global animation to avoid enter transitions on show
    patched.animation = false;
    patched.animationDuration = 0;
    patched.universalTransition = false;
    // sanitize lines data to avoid undefined coords
    patched.series = patched.series.map(s => {
      if (s && s.type === "lines" && Array.isArray(s.data)) {
        s.data = s.data.filter(item => item && Array.isArray(item.coords) && item.coords.length >= 2 && Array.isArray(item.coords[0]) && Array.isArray(item.coords[1]));
      }
      return s;
    });
    this._chart.setOption(patched, true);
  }

  setOption(option) {
    this._options = option || {};
    this._setOption(this._options);
  }

  remove() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._stationaryWatcher) {
      this._stationaryWatcher.remove();
      this._stationaryWatcher = null;
    }
    if (this._extentWatcher) {
      this._extentWatcher.remove();
      this._extentWatcher = null;
    }
    if (this._chart) {
      this._chart.dispose();
      this._chart = null;
    }
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
      this._container = null;
    }
  }
}
