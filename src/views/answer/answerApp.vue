<template>
  <div class="answer">
    <div class="fiexddiv">
      <h3>{{ curque.name }}</h3>
      <ul class="nationOptionscon projectsOptionscon" style="line-height: 1rem">
        <li v-for="(item, index) in curque.optS" :key="index" class="labelcon">
          <label>
            <input
              type="checkbox"
              name="opt"
              :value="item.optid"
              v-model="answer"
            />
            <p>{{ item.optid + item.val }}</p>
          </label>
        </li>
      </ul>
    </div>
    <div class="err" v-show="iserr"><img :src="error" />回答错误</div>
    <div class="combtn" @click="submit" v-show="!iserr">提交答案</div>
    <div class="combtn" @click="reanswer" v-show="iserr">再次答题</div>
  </div>
</template>
<script>
import { getParameter} from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
import { signSub,getToken } from "../../api/api2.js";
require("assets/css/task.css");
const error = require("assets/images/icon_iloveyou_error.png");
export default {
  components: {},
  data() {
    return {
      answer: [],
      iserr: false,
      error:error,
       baseimg: "http://img.qct-test.shinyway.org/",
      queOptions: [
        {
          queid: 1,
          name: "中国共产党比新通教育大多少岁？",
          daan: ["A"],
          optS: [
            { optid: "A", val: ".75" },
            { optid: "B", val: ".100" },
            { optid: "C", val: ".25" },
            { optid: "D", val: ".18" },
          ],
        },
        {
          queid: 2,
          name: "新通为客户提供的留学服务APP是？",
          daan: ["D"],
          optS: [
            { optid: "A", val: ".企业微信" },
            { optid: "B", val: ".钉钉" },
            { optid: "C", val: ".新通I LOVE 游" },
            { optid: "D", val: ".出国全程通" },
          ],
        },
        {
          queid: 3,
          name: "新姐想要查找关于背景提升的相关资料自学，他在哪里找不到？",
          daan: ["C"],
          optS: [
            { optid: "A", val: ".企业微信" },
            { optid: "B", val: ".新通大学" },
            { optid: "C", val: ".新通I LOVE 游" },
            { optid: "D", val: ".出国全程通" },
          ],
        },
        {
          queid: 4,
          name: "小小新今年两岁了，他可以在哪里认识更多的好朋友？",
          daan: ["C"],
          optS: [
            { optid: "A", val: ".新通游学 " },
            { optid: "B", val: ".新通培优" },
            { optid: "C", val: ".初本幼园 " },
            { optid: "D", val: ".发现教育" },
          ],
        },
        {
          queid: 5,
          name: "新姐找不到新通大学的搜索栏了，你能帮她找到吗？",
          daan: ["C"],
          optS: [
            { optid: "A", val: ".能，在新通大学待办事项里" },
            { optid: "B", val: ".不能，新通大学没有搜索栏" },
            { optid: "C", val: ".能，在新通大学首页轮播图正上方幼园" },
            { optid: "D", val: ".不能，我也不知道在哪里" },
          ],
        },
        {
          queid: 6,
          name: "学学子想订蛋糕给新通教育庆生，请问新通教育今年几岁了？",
          daan: ["C"],
          optS: [
            { optid: "A", val: ".75" },
            { optid: "B", val: ".20" },
            { optid: "C", val: ".25 " },
            { optid: "D", val: ".18" },
          ],
        },
        {
          queid: 7,
          name: "新通核心价值观是？",
          daan: ["A", "B"],
          optS: [
            { optid: "A", val: ".诚信专业" },
            { optid: "B", val: ".成就客户" },
            { optid: "C", val: ".积极进取" },
            { optid: "D", val: ".务实感恩" },
          ],
        },
        {
          queid: 8,
          name: "新通教育的企业文化是？",
          daan: ["A", "C", "D"],
          optS: [
            { optid: "A", val: ".积极进取" },
            { optid: "B", val: ".成就客户" },
            { optid: "C", val: ".务实感恩" },
            { optid: "D", val: ".协作共赢" },
          ],
        },
        {
          queid: 9,
          name: "你知道进入新通大学的手机端路径吗？",
          daan: ["A"],
          optS: [
            { optid: "A", val: ".知道，企业微信-工作台-新通大学" },
            { optid: "B", val: ".知道，新通大学APP" },
            { optid: "C", val: ".知道，钉钉-工作台-新通大学" },
            { optid: "D", val: ".不知道" },
          ],
        },
        {
          queid: 10,
          name: "新通教育的愿景是：提升中国学子全球竞争力。",
          daan: ["A"],
          optS: [
            { optid: "A", val: ".正确" },
            { optid: "B", val: ".错误" },
          ],
        },
      ],
      curque: {},
    };
  },
  mounted() {
    this.changeque();
  },
  methods: {
    changeque() {
      this.answer = [];
      let curid = Math.floor(Math.random() * 10);
      this.curque = this.queOptions[curid];
    },
    submit() {
      if(this.answer.length==0){
        alert("请回答题目")
        return 
      }

      if (this.curque.daan.length < this.answer.length) {
        this.iserr = true;
      } else {
        if (
          JSON.stringify(this.answer.sort()) == JSON.stringify(this.curque.daan)
        ) {
          console.log({
            userId: getParameter("userId"),
            missionId: 3,
          });
          signSub({
            userId: getParameter("userId"),
            missionId: 3,
          }, "/apiWalk/lx/ansQuestionByUserId", "post").then(
            (res) => {
              if (res.status == 11003) {
                //11003重新获取token  再执行当前方法
                getToken().then((res) => {
                  if (res.status == 1) {
                    //token没返回的话就不调用当前接口，防止死循环
                    this.submit();
                  }
                });
              } else if (res.status == 1) {
               window.location.href = "answersuc.html?userId="+getParameter("userId");
              } else {
                 alert(res.details);
              }
            }
          );

         
        } else {
          this.iserr = true;
        }
      }
    },
    reanswer() {
      this.changeque();
      this.iserr = false;
    },
  },

  watch: {},
};
</script>
<style>
</style>
