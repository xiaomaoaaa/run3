<template>
  <div>
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="form">
      <div class="logo"></div>
      <div class="runname"><img :src="huanlepaologo"/></div>
      <h2>2019新通教育Forever Young城市欢乐跑</h2>
      <h2>- 诚邀您参与 -</h2>
      <p>活动时间：2019年5月26日 8:00-11:00</p>
      <p>报名时间：即日起至2019年5月12日</p>
      <a class="subbtn" href="runregister.html">立即报名</a>
      <div class="foottext">
         <a href="agreement.html">活动规则</a>
         <a href="punchrate.html">公司打卡率</a>
      </div>
    </div>
  </div>
</template>
<script>
import Lib from "assets/js/Lib";
require("assets/css/runindex.css");
const huanlepaologo = require("assets/images/huanlepaologo.png");
export default {
  components: {},
  data() {
    return {
      huanlepaologo:huanlepaologo
    };
  },
  methods: {},
  mounted() {
 
  }
};
</script>
<style>
</style>
