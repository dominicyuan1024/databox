let scopeSilence = [];
const defaultConfig = {
  d: { use: "log", level: 5, title: "", style: "color:#00f" },
  i: { use: "info", level: 6, title: "", style: "color:#0a0" },
  w: { use: "warn", level: 7, title: "", style: "" },
  e: { use: "error", level: 8, title: "", style: "" }
};
const defaultLevel = process.env.NODE_ENV === "development" ? defaultConfig.d.level : defaultConfig.i.level;

function setSilence(sl = []) {
  scopeSilence = sl;
}
function LOG(scope, config = defaultConfig, level = defaultLevel) {
  level = scopeSilence.indexOf(scope) >= 0 ? Infinity : level;
  let Logger = {
    config: config,
    silence: scopeSilence,
    set level(level) {
      for (let key in this.config) {
        let conf = this.config[key];
        let title = `${conf.title}` + (scope ? `[${scope}]:` : ``);
        if (conf.level < level) this[key] = function() {};
        else this[key] = console[conf.use].bind(window.console, `%c${title}`, conf.style);
      }
      this._level = level;
    },
    get level() {
      return this._level;
    }
  };
  //level 的值有优先级，scopeConfig > 参数level >默认 level
  Logger.level = level;
  return Logger;
}

export { setSilence, LOG };
