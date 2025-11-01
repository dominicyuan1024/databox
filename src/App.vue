<template>
  <div id="app" class="oneMapPlus">
    <ompHeader></ompHeader>
    <div class="oneMapPlus-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import ompHeader from "./components/header.vue";
export default {
  name: "App",
  components: { ompHeader }
};
</script>
<style scoped>
.oneMapPlus {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
.oneMapPlus-content {
  flex-grow: 1;
  height: calc(100% - var(--header-height));
}
</style>
