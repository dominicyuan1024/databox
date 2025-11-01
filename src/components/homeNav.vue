<template>
  <div class="home-nav" onselectstart="return false">
    <div class="change img_switch fullbg" :class="{ img_switch_hl: isShowSystem }" @click="switchSystemNav"></div>
    <div class="navbox">
      <div class="bg">
        <ul class="nav">
          <li class="navitem" :class="{ selected: curGroup === item.label }" v-for="item in routeList" :key="item.path" @click="navSelect(item)">
            <p>{{ item.label }}</p>
            <ul class="childnav" v-show="curNav.group === item.group">
              <li class="clidnavitem fullbg" :class="{ selected: curLeaf === cld.label }" v-for="cld in item.children" :key="cld.path" @click.stop="navSelect(cld)">{{ cld.label }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="navSystem" v-show="isShowSystem">
      <ul class="sysList">
        <li class="sysItem" v-for="item in systemNavs" :key="item.name">
          <a class="link fullbg" :class="item.icon" :href="item.url" :target="item.url" :title="item.name"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { routes } from "../router.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      curNav: {},
      isShowSystem: false,
      systemNavs: [
        { url: "https://dominicyuan1024.github.io/blogs", icon: "img_blogs", name: "https://dominicyuan1024.github.io/blogs" },
        { url: "https://dominicyuan1024.github.io/enreader", icon: "img_enreader", name: "https://dominicyuan1024.github.io/enreader" },
        { url: "https://dominicyuan1024.github.io/flipmatch", icon: "img_flipmatch", name: "https://dominicyuan1024.github.io/flipmatch" }
      ]
    };
  },
  computed: {
    curGroup() {
      return this.curNav.group;
    },
    curLeaf() {
      return this.curNav.label;
    },
    routeList() {
      const itemMap = {};
      routes[0].children.forEach(item => {
        const grp = item.group;
        if (!grp) return (itemMap[item.label] = { ...item, group: item.label, children: [] });
        if (itemMap[grp]) return itemMap[grp].children.push(item);
        itemMap[grp] = { ...item, label: grp, children: [item] };
      });
      return Object.values(itemMap);
    }
  },
  watch: {},
  methods: {
    switchSystemNav() {
      this.isShowSystem = !this.isShowSystem;
    },
    navSelect(item) {
      this.$router.push({ path: item.path });
      if (item.children && item.children.length) {
        this.curNav = item.children[0];
        return;
      }
      this.curNav = item;
    }
  },
  created() {},
  mounted() {
    this.navSelect(this.routeList[0]);
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.img_switch {
  background-image: url("../assets/imgs/nav/switch_hl.png");
}
.img_switch_hl {
  background-image: url("../assets/imgs/nav/switch.png");
}
.img_flipmatch {
  background-image: url("../assets/imgs/nav/flipmatch.svg");
}
.img_enreader {
  background-image: url("../assets/imgs/nav/enreader.svg");
}
.img_blogs {
  background-image: url("../assets/imgs/nav/pitaya.svg");
}
.home-nav {
  position: fixed;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  top: var(--header-height);
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  z-index: 2;
  --bg: #1f2631;
  --height: 2em;
  --theight: 1em;
}
.change {
  position: absolute;
  right: -90px;
  top: -45px;
  z-index: 2;
  cursor: pointer;
  width: 2em;
  height: 2em;
}
.navSystem {
  position: absolute;
  left: 2em;
  right: 2em;
  top: 0;
  height: var(--height);
  z-index: 2;
  background: var(--bg);
}
.sysList {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.sysItem {
  margin: 0 1em;
}
.link {
  width: 2em;
  height: 2em;
  cursor: pointer;
  display: inline-block;
}
.link:hover {
  /* 向上移动0.1em */
  transform: translateY(-0.2em);
}
.navbox {
  height: var(--height);
  /* overflow: hidden; */
}
.bg {
  position: relative;
  height: 0;
  border: var(--height) solid transparent;
  border-top-color: var(--bg);
}
.nav {
  display: flex;
  height: var(--height);
  align-items: center;
  padding: 0 1em;
  transform: translateY(calc(0em - var(--height)));
}
.navitem {
  padding: 0.1em 1.3em;
  margin: 0 0.5em;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
  /* position: relative; */
}
.clidnavitem {
  margin: 0 1em;
  color: #fff;
  padding: 0.3em 3.2em;
  background-image: url("../assets/imgs/nav/cn.png");
}
.clidnavitem.selected {
  color: #264396;
  background-image: url("../assets/imgs/nav/cn_hl.png");
}
.childnav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  white-space: nowrap;
  margin-top: 1em;
  font-size: 14px;
}
.navitem:hover {
  color: #3fa7ff;
}
.navitem.selected {
  border-color: inherit;
  color: #3fa7ff;
}
</style>
