import Store from "../../utils/Store.js";
import axios from "axios";
const server = {
  // 公路-项目列表
  get_prjlist(params) {
    return axios.get("/data/roadConstruction_prjList.json", { params });
  }
};
const state = {
  projList: []
};
const mutations = {};
for (let key in state) {
  mutations[key] = function(state, data) {
    state[key] = data;
  };
}
// mapState, mapActions
export default new Store({
  state,
  mutations,
  actions: {
    fetch_projlist(ctx, data) {
      server
        .get_prjlist(data)
        .then(suc => {
          ctx.commit("projList", suc.data.data);
        })
        .catch(err => console.error("获取公路项目列表", err));
    }
  },
  getters: {
    get_serverMainTableData(state) {
      return {};
    }
  }
});
