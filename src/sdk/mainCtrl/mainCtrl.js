import { loadCss, loadScript } from "esri-loader";
import { loadESRI } from "./esri";
import axios from "axios";
import { styleInsert } from "./../style/style.js";

export const mainCtrl = {};

/**
 * 初始化引擎
 * @param option 初始化引擎的地址参数 可选 不传加载官方在线API，传object自定义API地址
 *         option={js:"",css:"",js2:"",css2:""}        js2 css2 备用地址  自动加载速度快的
 * @returns  Promise
 */
mainCtrl.init = function(option) {
  let p = new Promise(function(resolve, reject) {
    if (option != null && option.js != null) {
      let jsUrl = null;
      axios
        .get(option.js)
        .then(function() {
          if (jsUrl == null) {
            jsUrl = option.js;
            let urlOption = { js: option.js, css: option.css };
            resolve(load(urlOption));
          }
        })
        .catch(function() {
          console.log(option.js + "url访问失败");
        });
      if (option.js2 != null) {
        axios
          .get(option.js2)
          .then(function() {
            if (jsUrl == null) {
              jsUrl = option.js;
              let urlOption = { js: option.js2, css: option.css2 };
              resolve(load(urlOption));
            }
          })
          .catch(function() {
            console.log(option.js2 + "url访问失败");
          });
      }
    } else {
      let urlOption = "online";
      resolve(load(urlOption));
    }
  });
  return p;
};

function load(option) {
  styleInsert(); //插入自定义样式
  let p = new Promise(function(resolve, reject) {
    if (option == "online") {
      loadCss();
      loadScript()
        .then(loadESRI)
        .then(function(res) {
          console.log("引擎加载完成");
          resolve(res);
        })
        .catch(function(reason) {
          console.log(reason);
          reject(reason);
        });
      console.log("加载在线API");
    } else if (option.js != null && option.css != null) {
      loadCss(option.css);
      loadScript({ url: option.js })
        .then(loadESRI)
        .then(function(res) {
          console.log("引擎加载完成:" + option.js);
          resolve(res);
        })
        .catch(function(reason) {
          console.log(reason);
          reject(reason);
        });
    } else {
      console.log("请检查API地址");
    }
  });
  return p;
}
