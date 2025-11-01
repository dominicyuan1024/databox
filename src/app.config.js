export default {
  title: "山海市交通建设项目跟踪问效管理平台",
  sdk: {
    js: "https://js.arcgis.com/4.13/init.js",
    css: "https://js.arcgis.com/4.13/esri/themes/dark/main.css"
  },
  serverConfigs: [
    {
      layerName: "areas",
      url: "/map/shenzhen/areas.geoJson",
      type: "GeoJSONLayer"
    },
    {
      layerName: "railways",
      url: "/map/shenzhen/railways.geoJson",
      type: "GeoJSONLayer"
    },
    {
      layerName: "rivers",
      url: "/map/shenzhen/rivers.geoJson",
      type: "GeoJSONLayer"
    },
    {
      layerName: "motorway",
      url: "/map/shenzhen/ways/motorway.geoJson",
      type: "GeoJSONLayer"
    },
    {
      layerName: "primary",
      url: "/map/shenzhen/ways/primary.geoJson",
      type: "GeoJSONLayer"
    },
    {
      layerName: "secondary",
      url: "/map/shenzhen/ways/secondary.geojson",
      type: "GeoJSONLayer"
    }
  ],
  mapConfigs: [
    {
      id: "mapTest",
      sceneType: "global",
      zoom: 1
      // basemap: [],
      // camera: {
      //   position: { spatialReference: { latestWkid: 4326, wkid: 4326 }, x: 102.2588376210394, y: 24.464289108872716, z: 2712536.724890558 },
      //   heading: 359.9703350184371,
      //   tilt: 0.3508093706776957
      // }
    }
  ]
};
