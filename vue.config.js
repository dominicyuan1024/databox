const inside = "http://172.16.1.99";
const target = "http://172.17.204.136";
const JDDataURL = "http://42.243.108.41:81/TirsAPI/Query.ashx";

module.exports = {
  publicPath: "./",
  filenameHashing: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
