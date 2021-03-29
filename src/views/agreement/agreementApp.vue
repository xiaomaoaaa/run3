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
        <p class="pb30">1.以各分公司、子公司为单位组成团队参与全国城市PK赛，团队人数不限，队员包含在职员工及员工家属；</p>
        <p class="pb30">2.活动将统计各团队有效员工参与率、家庭有效参与率，最后评选前五名团队奖；</p>
        <p>3. 评选方式取两个数据：</p>
        <p>1）员工参赛率=活动开始后2小时内，公司内完成7公里人数/公司在职人数</p>
        <p class="pb15">2）家庭参赛率=活动开始后2小时内，完成3-7公里的，家庭积分总数/公司在职人数</p>
        <table>
          <tr>
            <th width="50%">家属年龄</th>
            <th width="50%">积分</th>
          </tr>
          <tr>
            <td>0-14周岁</td>
            <td>20</td>
          </tr>
          <tr>
            <td>15岁-50周岁（不含）</td>
            <td>10</td>
          </tr>
          <tr>
            <td>50周岁及以上</td>
            <td>20</td>
          </tr>
        </table>
        <p class="pb30 pt15">3）两项数据依次进行1000-100分的评分，两项分值进行相加，分值叠加后，总分取前五名。</p>
        <p class="pb30">4.创意造型家庭组评选：线上+线下，线上取家庭组成员朋友圈/抖音集赞数，线下取活动当天路人拉票数，全国共评选前二十组，发放定制礼物。</p>
      </div>
      <div class="tabcon">
        <p class="pb30">1.下载【新通欢乐跑】活动APP；</p>
        <p class="pb30">2.注册【新通欢乐跑】APP用户后，填写姓名、性别、手机号码、所在分公司、健康状况、是否携带家属、家属人数、家属信息（姓名，年龄，性别，与员工关系、健康状况）等信息即可完成报名；</p>
        <p class="pb30">3.活动正式开启后，可通过【新通欢乐跑】按钮进入成绩统计页面查看个人数据、团队成绩排名；</p>
        <p class="pb30">4.活动结束时，点击“结束”——“确认”按钮，即可将本次里程数上传到该活动中；</p>
      </div>
      <div class="tabcon">
        <p class="pb30">1. 员工使用【新通欢乐跑】APP记录里程并上传，根据分公司员工有效参赛率、家庭有效参赛率计算团队成绩；</p>
        <p class="pb30">2. 本活动仅记录在活动开始后2小时时间里，员工里程达到7公里的单次毅行方为有效，家属里程达到3-7公里的单次毅行，不足3公里的记录不计入成绩，超过7公里的记录按照7公里计入成绩；</p>
        <p class="pb30">3. 本活动仅接受户外GPS良好环境下采集的正常数据（如遇恶劣天气情况除外），使用GPS定位记录毅行信息，请确保运动时您的GPS功能及定位权限正常开启，搭载交通工具、室内跑步机等产生的数据将被系统认定为配速异常，即无效里程。</p>
      </div>
    </div>

</template>
<script>
import Lib from "assets/js/Lib";
require("assets/css/agreement.css");
const bg_head = require("assets/images/bg_head.jpg");
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
