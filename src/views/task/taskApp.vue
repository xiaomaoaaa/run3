<template>
  <div class="task">
    <div class="logo"></div>
    <div class="banner"></div>
    <div class="taskcon">
      <div class="green1">
        <div class="contit"></div>
        <p>
          春游诗朗诵。请小分队伙伴在指定地点前集体朗诵下面古诗并拍摄成一段15S内的小视频，完成后上传即可
        </p>
      </div>
      <div class="green2">
        <div class="contit"></div>
        <h2>《春游》</h2>
        <p>唐代：王勃</p>
        <p>客念纷无极，春泪倍成行。</p>
        <p>今朝花树下，不觉恋年光。</p>
        <p>客念纷无极，春泪倍成行。</p>
      </div>
    </div>
    <div class="nextbtn"></div>
    <div class="combtn">111</div>
  </div>
</template>
<script>
import { getParameter, transmit, setDocTitle } from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
require("assets/css/agreement.css");
require("assets/css/task.css");
const bg_head = require("assets/images/bg_head.jpg");
const bg_head2 = require("assets/images/bg_head2.jpg");
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    document.body.style.background =
      " #ccc url('" + bg_head2 + "') no-repeat center bottom";
    document.body.style.backgroundSize = "100% auto";
  },
  watch: {},
};
</script>
<style>
</style>
