import { loadModules } from "esri-loader";
const esri = {};
function loadESRI() {
  let p = new Promise(function(resolve, reject) {
    loadModules([
      "esri/Map",
      "esri/Camera",
      "esri/views/SceneView",

      // "esri/views/MapView",
      "esri/layers/TileLayer",
      "esri/Basemap",

      // "esri/widgets/BasemapGallery",
      "esri/widgets/Home/HomeViewModel",
      "esri/widgets/Compass/CompassViewModel",
      "esri/widgets/Fullscreen/FullscreenViewModel",

      // "esri/widgets/Zoom/ZoomViewModel",
      "esri/layers/FeatureLayer",

      // "esri/layers/MapImageLayer",
      "esri/layers/GraphicsLayer",

      // "esri/layers/CSVLayer",
      "esri/layers/GeoJSONLayer",
      "esri/layers/SceneLayer",
      "dojo/_base/array",

      // "esri/layers/BuildingSceneLayer",

      // "esri/layers/WMTSLayer",

      // "esri/layers/WebTileLayer",

      // "esri/layers/WMSLayer",
      "esri/layers/ElevationLayer",
      "esri/geometry/Point",

      // "esri/geometry/Polygon",
      "esri/geometry/Polyline",
      "esri/Color",

      // "esri/geometry/Circle",
      "esri/geometry/Extent",

      // "esri/symbols/SimpleMarkerSymbol",

      // "esri/symbols/PointSymbol3D",

      // "esri/symbols/PictureMarkerSymbol",

      "esri/symbols/SimpleLineSymbol",

      // "esri/symbols/LineSymbol3D",

      // "esri/symbols/SimpleFillSymbol",

      // "esri/symbols/PictureFillSymbol",
      "esri/Graphic",

      // "esri/symbols/TextSymbol",

      // "esri/symbols/Font",

      // "esri/layers/support/LabelClass",

      // "esri/symbols/LabelSymbol3D",

      // "esri/symbols/TextSymbol3DLayer",

      // "esri/widgets/DistanceMeasurement2D",

      // "esri/widgets/AreaMeasurement2D",

      // "esri/widgets/DirectLineMeasurement3D",

      // "esri/widgets/AreaMeasurement3D",

      // "esri/widgets/Legend",
      "esri/geometry/geometryEngine",

      // "esri/tasks/GeometryService",

      // "esri/tasks/QueryTask",

      // "esri/tasks/support/Query",

      // "esri/tasks/IdentifyTask",

      // "esri/tasks/support/IdentifyParameters",

      // "esri/tasks/Geoprocessor",

      // "esri/tasks/support/FeatureSet",

      // "esri/tasks/workflow/ConfigurationTask",

      // "esri/request",

      // "esri/widgets/Sketch/SketchViewModel",

      // "esri/core/watchUtils",
      "esri/geometry/SpatialReference",
      "esri/layers/VectorTileLayer",
      "esri/views/3d/externalRenderers",

      // "esri/widgets/Slice",

      // "esri/core/urlUtils",
      "esri/geometry/support/geodesicUtils",
      "esri/geometry/support/webMercatorUtils"

      // "esri/config"
    ]).then(([Map, Camera, SceneView, TileLayer, Basemap, HomeViewModel, CompassViewModel, FullscreenViewModel, FeatureLayer, GraphicsLayer, GeoJSONLayer, SceneLayer, array, // BasemapGallery, // MapView, // WMSLayer, // WebTileLayer,

      // ZoomViewModel,

      // MapImageLayer,

      // CSVLayer,

      // WMTSLayer,

      // BuildingSceneLayer,
      ElevationLayer, Point, Polyline, Color, Extent, SimpleLineSymbol, // SimpleMarkerSymbol, // Circle, // Polygon, // PictureMarkerSymbol, // PointSymbol3D,

      // LineSymbol3D,

      // SimpleFillSymbol,

      // PictureFillSymbol,
      Graphic, // TextSymbol, // LabelClass, // LabelSymbol3D, // TextSymbol3DLayer,

      // Font,

      // AreaMeasurement3DWidgets,

      // DirectLineMeasurement3DWidgets,

      // AreaMeasurement2DWidgets,

      // DistanceMeasurement2DWidgets,

      // Legend,
      geometryEngine, // GeometryService, // QueryTask, // IdentifyTask, // Query,

      // IdentifyParameters,

      // Geoprocessor,

      // FeatureSet,

      // ConfigurationTask,

      // esriRequest,

      // SketchViewModel,

      // watchUtils,
      SpatialReference, VectorTileLayer, externalRenderers, geodesicUtils, webMercatorUtils]) => {
      // urlUtils,

      // Slice,

      // esriConfig
      esri.Map = Map;
      esri.Camera = Camera;
      esri.SceneView = SceneView;

      // esri.MapView = MapView;
      esri.TileLayer = TileLayer;
      esri.Basemap = Basemap;
      //esri.BasemapGallery = BasemapGallery;
      esri.HomeViewModel = HomeViewModel;
      esri.CompassViewModel = CompassViewModel;
      esri.FullscreenViewModel = FullscreenViewModel;

      // esri.ZoomViewModel = ZoomViewModel;
      esri.FeatureLayer = FeatureLayer;

      // esri.MapImageLayer = MapImageLayer;
      esri.GraphicsLayer = GraphicsLayer;

      // esri.CSVLayer = CSVLayer;
      esri.GeoJSONLayer = GeoJSONLayer;
      esri.SceneLayer = SceneLayer;
      esri.array = array;
      // esri.BuildingSceneLayer = BuildingSceneLayer;

      // esri.WMTSLayer = WMTSLayer;

      // esri.WebTileLayer = WebTileLayer;

      // esri.WMSLayer = WMSLayer;
      esri.ElevationLayer = ElevationLayer;
      esri.Point = Point;

      // esri.Polygon = Polygon;
      esri.Polyline = Polyline;
      esri.Color = Color;

      // esri.Circle = Circle;
      esri.Extent = Extent;

      // esri.SimpleMarkerSymbol = SimpleMarkerSymbol;

      // esri.PointSymbol3D = PointSymbol3D;

      // esri.PictureMarkerSymbol = PictureMarkerSymbol;

      esri.SimpleLineSymbol = SimpleLineSymbol;

      // esri.LineSymbol3D = LineSymbol3D;

      // esri.SimpleFillSymbol = SimpleFillSymbol;

      // esri.PictureFillSymbol = PictureFillSymbol;
      esri.Graphic = Graphic;

      // esri.TextSymbol = TextSymbol;

      // esri.Font = Font;

      // esri.LabelSymbol3D = LabelSymbol3D;

      // esri.TextSymbol3DLayer = TextSymbol3DLayer;

      // esri.LabelClass = LabelClass;

      // esri.DistanceMeasurement2DWidgets = DistanceMeasurement2DWidgets;

      // esri.AreaMeasurement2DWidgets = AreaMeasurement2DWidgets;

      // esri.DirectLineMeasurement3DWidgets = DirectLineMeasurement3DWidgets;

      // esri.AreaMeasurement3DWidgets = AreaMeasurement3DWidgets;

      // esri.Legend = Legend;
      esri.geometryEngine = geometryEngine;

      // esri.GeometryService = GeometryService;

      // esri.QueryTask = QueryTask;

      // esri.Query = Query;

      // esri.IdentifyTask = IdentifyTask;

      // esri.IdentifyParameters = IdentifyParameters;

      // esri.Geoprocessor = Geoprocessor;

      // esri.FeatureSet = FeatureSet;

      // esri.ConfigurationTask = ConfigurationTask;

      // esri.esriRequest = esriRequest;

      // esri.SketchViewModel = SketchViewModel;

      // esri.watchUtils = watchUtils;
      esri.SpatialReference = SpatialReference;
      esri.VectorTileLayer = VectorTileLayer;
      esri.externalRenderers = externalRenderers;

      // esri.Slice = Slice;

      // esri.urlUtils = urlUtils;
      esri.geodesicUtils = geodesicUtils;
      esri.webMercatorUtils = webMercatorUtils;

      // esri.esriConfig = esriConfig;
      resolve(1);
    });
  });
  return p;
}

export { loadESRI, esri };
