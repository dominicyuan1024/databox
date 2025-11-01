<!-- 首页 公路 -->
<template>
  <div class="board">
    <div class="tit">
      <mainTitle icon="img_gl">公路建设</mainTitle>
    </div>
    <div class="content">
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>山海市农村公路项目</subTitle></div>
          <div class="chartbox">
            <div class="selectdiv">
              <a-icon type="search" class="icons" />
              <input type="text" placeholder="请输入搜索的内容..." class="myinput" />
            </div>
            <div class="list">
              <div class="listItem" v-for="(item, ide) in listdata" :key="ide">
                <img src="../../../assets/imgs/car.png" alt="" />
                <div class="listText">{{ item.text }}</div>
              </div>
            </div>
            <!-- <div class="selectIcon">
              <img src="../../../assets/imgs/select.png" alt="" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { secondary, secondaryLoad, closeLayer } from "../../../components/map/layer";

export default {
  data() {
    return {
      listdata: [
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        },
        {
          text: "山海市交通运输局（农村处）"
        }
      ]
    };
  },
  activated() {
    secondaryLoad();
  },
  deactivated() {
    closeLayer(secondary);

    // this.$root.$emit("closeLayer", secondary);
  },
  methods: {
    onSearch(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
.selectIcon {
  width: 80%;
  margin: auto;
  text-align: center;
}
.selectIcon img {
  width: 50px;
}
.listItem {
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: left;
  margin-left: 73px;
  height: 29px;
  line-height: 29px;
  color: rgba(80, 197, 255, 1);
  font-size: 14px;
}
.listItem img {
  height: 29px;
  margin-right: 20px;
}
.list {
  width: 80%;
  margin: auto;
  height: 80%;
  border: 2px solid rgba(80, 197, 255, 1);
  border-top: 0 solid white;
  overflow: auto;
}
.selectdiv {
  width: 80%;
  margin: auto;
  position: relative;
}
.icons {
  position: absolute;
  top: 13px;
  right: 10px;
  color: rgba(80, 197, 255, 1);
  cursor: pointer;
  font-size: 20px;
}
input::-webkit-input-placeholder {
  color: rgba(80, 197, 255, 1);
  font-size: 14px;
}
.myinput:focus {
  outline: 2px solid rgba(80, 197, 255, 1);
}
.myinput {
  padding-left: 20px;
  width: 100%;
  height: 40px;
  border: 2px solid rgba(80, 197, 255, 1);
  background: #164769;
  color: rgba(80, 197, 255, 1);
}
.board {
  height: 100%;
  /* background: #00f; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.tit {
  flex-shrink: 0;
}
.content {
  /* background: #fff; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.row {
  height: 100%;
  /* background: #000; */
  display: flex;
  overflow: hidden;
}
.colum {
  width: 50%;
  flex-grow: 1;
  /* background: #333; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.subtitbox {
  margin-top: 20px;
  flex-shrink: 0;
}
.chartbox {
  margin-top: 20px;
  flex-grow: 1;
  height: 100%;
  /* background: #999; */
}
</style>
