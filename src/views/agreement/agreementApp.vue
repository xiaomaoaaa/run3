<template>
 
    <div class="activetab">
      <ul class="tabmenu clearfix" :style="styleObject">
        <li
          :class="{cur:item.iscur}"
          @click="toggleli(item,index)"
          v-for="(item,index) in litext"
          :key="index"
        >
          {{item.text}}
          <div class="bottomline" v-show="item.iscur"></div>
        </li>
      </ul>
      <div class="tabcon">
        <p class="pb30">1.【“I LOVE 游“团队奖】以各分公司、子公司为单位，参与全国城市PK赛，根据员工完赛率排名，取前五名的公司发放奖励；员工完赛率=活动开始后3小时内，公司内完成5.2公里的人数/公司在职人数</p>
        <p class="pb30">2.【全国花样少年奖】以员工个人为单位，通过线上方式（朋友圈/抖音）分享当天活动集锦，并进行集赞活动，全国共评选点赞数前二十的个人，发放礼物。</p>
        <p>3. 【当地默契小分队奖】以各地当天组成的小分队为单位，完成路程中所有任务，根据完赛速度可获得相应的团队奖励。（具体以分公司当地规则为准）</p>
      </div>
      <div class="tabcon">
        <p class="pb30">1.下载【新通I LOVE 游】活动APP；</p>
        <p class="pb30">2.注册【新通I LOVE 游】APP用户后，填写姓名、手机号码、所在分公司、健康状况等信息即可完成报名；</p>
        <p class="pb30">3.活动正式开启后，可通过【新通I LOVE 游】按钮进入排行榜页面查看公司成绩排名、个人数据以及小分队排名；</p>
        <p class="pb30">4.活动结束时，点击“结束”——“确认”按钮，即可将本次里程数及成绩排名上传到该活动中；</p>
      </div>
      <div class="tabcon">
        <p class="pb30">1. 员工使用【新通I LOVE 游】APP记录里程并上传，根据分公司员工有效完赛率计算团队成绩；</p>
        <p class="pb30">2. 本活动仅记录在活动开始后3小时时间里，员工里程达到5.20公里的单次毅行方为有效；</p>
        <p class="pb30">3. 本活动仅接受户外GPS良好环境下采集的正常数据（如遇恶劣天气情况除外），使用GPS定位记录毅行信息，请确保运动时您的GPS功能及定位权限正常开启，搭载交通工具、室内跑步机等产生的数据将被系统认定为配速异常，即无效里程。</p>
      </div>
    </div>

</template>
<script>
import Lib from "assets/js/Lib";
require("assets/css/agreement.css");
const bg_head = "http://img.qct-test.shinyway.org/file/runimg/bg_head.jpg";
export default {
  components: {},
  data() {
    return {
       styleObject: {
          background: "url('" + bg_head + "') no-repeat right center",
          "backgroundSize":  "100% auto"
      },
      close: close,
      litext: [
        {
          text: "赛制",
          iscur: true
        },
        {
          text: "报名流程",
          iscur: false
        },
        {
          text: "活动规则",
          iscur: false
        }
      ]
    };
  },
  methods: {
    toggleli(item, index) {
      this.litext.forEach(function(el) {
        el.iscur = false;
      });
      item.iscur = true;
      var tabconhtml = document.querySelectorAll(".tabcon");
      for (var i = 0; i < tabconhtml.length; i++) {
        tabconhtml[i].style.display = "none";
      }
      tabconhtml[index].style.display = "block";
    }
  },
  mounted() {

  },
  watch: {}
};
</script>
<style>
</style>
