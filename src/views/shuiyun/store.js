import Store from "../../utils/Store.js";
import axios from "axios";
const server = {
  // 公路-控制性工程
  get_ctl() {
    return axios.get("./data/highwayConstruction_ctl.json");
  },
  // 公路-形象进度
  get_highwayConstruction() {
    return axios.get("./data/highwayConstruction.json");
  },
  // 公路-建设规模
  get_constructionScale() {
    return axios.get("./data/roadConstruction_constructionScale.json");
  }
};
const state = {
  mainTableLoading: false,
  // 公路-形象进度
  gonglu_xxjd: [],
  // 公路-控制性工程
  gonglu_kzxgc: [],
  // 公路-建设项目
  gonglu_jsxm: [],
  // 公路-开工情况
  gonglu_kgqk: [],
  // 公路-建设里程
  gonglu_jslc: [],
  // 公路-概预算总投资
  gonglu_gysztz: [],
  // 公路-建设规模后端数据
  gonglu_jsgm: {}
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
    fetch_ctl(ctx) {
      const { commit } = ctx;
      server
        .get_ctl()
        .then(suc => {
          commit("gonglu_kzxgc", suc.data.data);
        })
        .catch(err => console.error("", err));
    },
    fetch_highwayConstruction(ctx) {
      const { commit } = ctx;
      server
        .get_highwayConstruction()
        .then(suc => {
          commit("gonglu_xxjd", suc.data.data);
        })
        .catch(err => console.error("", err));
    },
    fetch_constructionScale(ctx) {
      const { commit } = ctx;
      server
        .get_constructionScale()
        .then(suc => {
          const data = suc.data.data;
          commit("gonglu_jsgm", data || {});
          const wclc = 0;
          const { GgPrjCount, DgPrjCount, GdPrjCount, SdPrjCount, TotalMileage } = data;
          commit("gonglu_jsxm", {
            GgPrjCount,
            DgPrjCount,
            GdPrjCount,
            SdPrjCount,
            TotalMileage,
            wclc
          });

          const {
            GsglTotalPrjCount,
            GsgdTotalPrjCount,
            ncglProjCount = 0,
            GsglYkgPrjCount,
            GsglSydkgPrjCount,
            GsglWkgPrjCount,
            GsglYtcPrjCount,
            GsgdYkgPrjCount,
            GsgdSydkgPrjCount,
            GsgdWkgPrjCount,
            GsgdYtcPrjCount
          } = data;
          commit("gonglu_kgqk", {
            GsglTotalPrjCount,
            GsgdTotalPrjCount,
            ncglProjCount,
            GsglYkgPrjCount,
            GsglSydkgPrjCount,
            GsglWkgPrjCount,
            GsglYtcPrjCount,
            GsgdYkgPrjCount,
            GsgdSydkgPrjCount,
            GsgdWkgPrjCount,
            GsgdYtcPrjCount
          });
          const { GgTotalMileage, DgTotalMileage, GdTotalMileage, SdTotalMileage, GgTotalMileageNot = 0, DgTotalMileageNot = 0, GdTotalMileageNot = 0, SdTotalMileageNot = 0 } = data;
          commit("gonglu_jslc", { GgTotalMileage, DgTotalMileage, GdTotalMileage, SdTotalMileage, GgTotalMileageNot, DgTotalMileageNot, GdTotalMileageNot, SdTotalMileageNot });
          commit("gonglu_gysztz", []);
        })
        .catch(err => console.error("", err));
    },
    fetch_data(ctx) {
      const { dispatch } = ctx;
      dispatch("fetch_ctl");
      dispatch("fetch_highwayConstruction");
      dispatch("fetch_constructionScale");
    }
  },
  getters: {
    get_serverMainTableData(state) {
      return {};
    }
  }
});
