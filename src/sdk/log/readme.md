# Log 使用方法

## 引用 log.js

```javascript
import { setSilence, LOG } from "./LOG.js";
```

- setSilence 用于禁止某个实例的日志输出
- LOG 是实例的构造函数

## 提前设置关闭某个模块日志

```javascript
setSilence(["", ""]);
```

- 将 new Log( "scope" ) 中的 scope 对应的日志关闭，不输出

## 调用全局 log 的方法

```javascript
window.LOG = LOG;
window.log = new LOG("fw", config | null, level | null);
//config  level 两个参数可以缺省，不传将使用默认的配置与等级
```

## 针对模块生成新的实例

```javascript
let myLog = new LOG("moudleName");
```

## 日志配置项

```javascript
const defaultConfig = {
  d: { use: "log", level: 5, title: "", style: "color:#00f" },
  i: { use: "info", level: 6, title: "", style: "color:#0a0" },
  w: { use: "warn", level: 7, title: "", style: "" },
  e: { use: "error", level: 8, title: "", style: "" },
};
log.d( <any> )  //console.debug
log.i( <any> )  //console.info
log.w( <any> )  //console.warn
log.e( <any> )  //console.error
```

- 对象的 key 将在 new 之后变为实例的方法名 log.d() log. i() log.w() log.e()
- use 使用 console 的哪个方法输出日志
- level 日志等级，高于等级设置的日志等级才会输出
- title 添加到日志开头的文案
- style 日志输出的样式
