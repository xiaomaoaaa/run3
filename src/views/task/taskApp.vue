<template>
  <div class="task">
    <div class="banner"></div>
    <div class="taskcon" v-if="taskOrder == 1">
      <div class="green1">
        <div class="contit"></div>
        <p>
          <span v-if="ishz == 1">报先寺春游诗朗诵</span
          ><span v-else>春游诗朗诵</span
          >。请小分队伙伴在指定地点前集体朗诵下面古诗并拍摄成一段15S内的小视频，完成后上传即可
        </p>
        <div class="linkbtn"></div>
        <div class="linkbtn2"></div>
      </div>
      <div class="green2">
        <div class="contit"></div>
        <h2>《春游》</h2>
        <p class="f20">唐代：王勃</p>
        <p>客念纷无极，春泪倍成行。</p>
        <p>今朝花树下，不觉恋年光。</p>
      </div>
    </div>
    <div class="taskcon" v-if="taskOrder == 2">
      <div class="green1">
        <div class="contit"></div>
        <p>
          <span v-if="ishz == 1">灵峰山登顶合影</span
          ><span v-else>登顶合影</span
          >:到达指定地点后请小分队集体合影留念（姿势自选）并上传。
        </p>
        <p>PS：队伍之间可相互帮忙哦~</p>
      </div>
    </div>
    <div class="taskcon" v-if="taskOrder == 3">
      <div class="green1">
        <div class="contit"></div>
        <p>
          <span v-if="ishz == 1">美女山趣味问答</span
          ><span v-else>趣味问答</span
          >:请小分队队员回答问题，回答正确即可通过，全体队员均回答正确即可完成挑战问题
        </p>
      </div>
    </div>
    <div class="taskcon" v-if="taskOrder == 4">
      <div class="green1">
        <div class="contit"></div>
        <p>
          <span v-if="ishz == 1">将军山祝福新通</span
          ><span v-else>祝福新通</span
          >。请小分队成员在指定地点完成以“祝福新通25周年”为主题的小视频（不超过15S）并上传。
        </p>
      </div>
    </div>
    <div class="taskcon" v-if="taskOrder == 5">
      <div class="green1">
        <div class="contit"></div>
        <p>
          <span v-if="ishz == 1">老和山回忆杀</span
          ><span v-else>回忆杀</span
          >。请每队上传一张本次春游沿途拍摄的最美风景照。并留下你们小分队的50字参赛感言。
        </p>
      </div>
    </div>
    <div class="nextbtn" v-if="teamList.length == 0"></div>
    <div class="teammateList" v-if="teamList.length > 0">
      <div class="imgtit3"></div>
      <div v-if="taskOrder == 3">
        <ul>
          <li v-for="(item, index) in teamList" :key="index">
            <img :src="item.picPath ? baseimg + item.picPath : defaultimg" />
            <div class="name">{{ item.userName }}</div>
            <p :class="{ compeleted: item.thridResult == 1 }"></p>
          </li>
        </ul>
      </div>
      <div v-else>
          <div class="tip">本题仅需队伍内任意一名小伙伴完成提交，即算完成任务</div>
        <ul>
          <li v-for="(item, index) in teamList" :key="index">
            <img :src="item.picPath ? baseimg + item.picPath : defaultimg" />
            <div class="name">毛建飞</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="combtn" @click="transmit" >{{taskOrder == 3?"开始答题":"点击上传照片和视频"}}</div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="7000"
      text="你有错过的任务点哦，请记得返回寻找并完成打卡~"
      position="middle"
      width="2.5rem"
    ></toast>
  </div>
</template>
<script>
import { Toast } from "vux";
import { signSub, getToken } from "../../api/api2.js";
import { getParameter, transmit, setDocTitle } from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
require("assets/css/task.css");
const defaultimg = require("assets/images/img_task_avator_default.png");
export default {
  components: { Toast },
  data() {
    return {
      taskOrder: 1,
      teamList: [],
      defaultimg: defaultimg,
      showPositionValue: false,
      userTeam: {},
      ishz: "",
      baseimg: "http://img.qct-cg.shinyway.org/",
    };
  },

  mounted() {
    this.getuserteam();
    this.taskOrder = getParameter("taskOrder");
    document.body.style.background = "#fefef2";
  },
  methods: {
    getuserteam() {
      signSub(
        {
          userId: getParameter("userId"),
        },
        "/apiWalk/lx/queryUserTeamByUserId",
        "post"
      ).then((res) => {
        if (res.status == 11003) {
          //11003重新获取token  再执行当前方法
          getToken().then((res) => {
            if (res.status == 1) {
              //token没返回的话就不调用当前接口，防止死循环
              this.getuserteam();
            }
          });
        } else if (res.status == 1) {
          if (res.data) {
            this.userTeam = res.data.userTeam;
            if (this.taskOrder == 1) {
              this.teamList = res.data.teamUsers.filter((item) => {
                return item.firstResult == 1;
              });
            } else if (this.taskOrder == 2) {
              this.teamList = res.data.teamUsers.filter((item) => {
                return item.secondResult == 1;
              });
            } else if (this.taskOrder == 3) {
              this.teamList = res.data.teamUsers;
            } else if (this.taskOrder == 4) {
              this.teamList = res.data.teamUsers.filter((item) => {
                return item.fourthResult == 1;
              });
            } else {
              this.teamList = res.data.teamUsers.filter((item) => {
                return item.fifthResult == 1;
              });
            }
          }
        } else {
          alert(res.details);
        }
      });
    },
    transmit() {
      if (this.taskOrder == 3) {
        window.location.href=`answer.html?userId=${getParameter('userId')}`
      } else {
        if (parseInt(this.userTeam.teamScore) < parseInt(this.taskOrder) - 1) {
          this.showPositionValue = true;
          setTimeout(() => {
            transmit("swUploadFile", {
              number: this.taskOrder,
            });
            this.showPositionValue = false;
          }, 7000);
        } else {
          transmit("swUploadFile", {
            number: this.taskOrder,
          });
        }
      }
    },
  },
  watch: {},
};
</script>
<style>
</style>
