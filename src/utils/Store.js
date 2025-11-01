import { createNamespacedHelpers } from "vuex";
import store from "../store.js";
export default function(module) {
  const name = "store" + Math.random();
  store.registerModule(name, { ...module, namespaced: true });
  const storeInstance = { ...createNamespacedHelpers(name), moduleName: name };
  return storeInstance;
}

// 使用
// import Store from "当前模块"
// export default new Store({
//   state: () => ({ ... }),
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// })
