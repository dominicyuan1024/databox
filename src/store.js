import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const userInfoStr = window.sessionStorage.getItem("omp_user_info");
let userInfo = {};
try {
  userInfo = JSON.parse(userInfoStr) || {};
} catch (err) {
  console.log("session 用户信息不合法");
}
export default new Vuex.Store({
  state: {
    userInfo: userInfo
  },
  mutations: {
    userInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    update_userInfo(ctx, data) {
      ctx.commit("userInfo", data);
    }
  }
});
