<!--  -->
<template>
  <div></div>
</template>

<script>
import { railways, railwaysLoadColorful, closeLayer } from "../../components/map/layer.js";
let layer;
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  activated() {
    railwaysLoadColorful();
  },
  deactivated() {
    closeLayer(railways);
  },
  mounted() {},
  destryed() {}
};
</script>
<style scoped></style>
