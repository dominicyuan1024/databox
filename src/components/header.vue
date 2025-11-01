<template>
  <div class="oneMapPlus-header">
    <div class="header ">
      <div class="tjjztime"><p>统计截止时间：2020年5月20日 13:16:23 (本应用数据纯属虚构，切勿当真！)</p></div>
      <div class="header-title fullbg">{{ title }}</div>
      <div class="header-tool">
        <!-- <div class="header-time header-tool-item">
          <p class="header-time-date">{{ now[1] }}</p>
        </div>
        <div class="split"></div> -->
        <div class="header-time header-tool-item">
          <p class="header-time-date">
            <span>{{ username }}</span>
          </p>
        </div>
        <div>
          <p class="out" @click="logout">退出</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import mainStore from "../store.js";
import Config from "../app.config.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      now: []
    };
  },
  computed: {
    username() {
      const name = mainStore.state.userInfo.username;
      return name ? `用户名： ${name}` : ``;
    },
    title() {
      return Config.title;
    }
  },
  watch: {},
  methods: {
    timer() {
      this.timerRender();
      this.$timer = window.setTimeout(() => {
        this.timer();
      }, 1000);
    },
    timerRender() {
      this.now = moment()
        .format("YYYY-MM-DD,HH:mm:ss")
        .split(",");
      let mydate = new Date();
      let myddy = mydate.getDay();
      let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      this.now[0] += ` ${weekday[myddy]}`;
    },
    logout() {
      window.location.href = "https://dominicyuan1024.github.io/blogs";
    }
  },
  created() {
    this.timer();
  },
  mounted() {},
  beforeDestroy() {
    window.clearTimeout(this.$timer);
  }
};
</script>

<style scoped>
/* >>>>>>>>>>>>>>>>>>>>>>>> 头部组件 >>>>>>>>>>>>>>>>>>>>>>>> */
.oneMapPlus-header {
  position: relative;
  z-index: 1;
  height: var(--header-height);
  color: rgba(255, 255, 255, 1);
}
.header,
.header-title,
.header-tool {
  display: flex;
  align-items: center;
  height: 100%;
}
.header {
  justify-content: space-between;
  background: #1f2631;
}
.header-logo {
  margin-right: 0.5rem;
}
.header-title {
  width: 100%;
  justify-content: center;
  font-size: 1.8em;
  font-weight: bold;
  /* text-shadow: -1px -1px 5px rgba(46, 68, 243, 1); */
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.2);
  background: linear-gradient(0deg, rgba(46, 68, 243, 1) 0%, rgba(142, 253, 255, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header-tool {
  align-items: flex-end;
  margin-right: 2rem;
  height: 100%;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
}
.header-tool-item {
  height: 100%;
  display: flex;
  align-items: center;
}
.split {
  margin: 0 1rem;
  width: 1px;
  height: 1em;
  background: linear-gradient(0deg, rgba(141, 211, 255, 1), rgba(255, 255, 255, 1));
  box-shadow: 0px 5px 5px 0px rgba(0, 25, 110, 0.75);
}
.header-time {
  min-width: 9rem;
  line-height: 1;
}
.header-time-date {
  padding-right: 0.5rem;
  text-align: right;
}
.header-time-now {
  font-size: 2rem;
}
.out {
  padding: 2px 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 2em;
  font-size: 0.8em;
  cursor: pointer;
}
.tjjztime {
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 2rem;
}
</style>
