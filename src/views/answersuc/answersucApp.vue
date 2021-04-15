<template>
  <div class="task">
    <div class="banner"></div>
    <div class="taskcon">
      <div class="green1">
        <div class="contit"></div>
        <p>
          趣味问答:请小分队队员回答问题，回答正确即可通过，全体队员均回答正确即可完成挑战问题
        </p>
      </div>
    </div>
    <div class="teammateList">
      <div class="imgtit3"></div>
        <ul>
          <li v-for="(item, index) in teamList" :key="index">
            <img :src="item.picPath ? baseimg + item.picPath : defaultimg" />
            <div class="name">{{ item.userName }}</div>
            <p :class="{ compeleted: item.thridResult == 1 }"></p>
          </li>
        </ul>
    </div>
    <div class="succtip">答题成功！请等待其他队员完成</div>
    <div class="sharetip" v-show="iscusmodal">
      <div class="sharetipcon">
        <h3>恭喜你！全组完成答题</h3>
        <div class="btngroup" @click="closesharetipcon">
          <button>确定</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { signSub,getToken } from "../../api/api2.js";
import { getParameter, transmit } from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
require("assets/css/task.css");

export default {
  components: {},
  data() {
    return {
      teamList:[],
      defaultimg:"http://img.qct-test.shinyway.org/file/runimg/img_task_avator_default.png",
      iscusmodal:false,
      baseimg: "http://img.qct-test.shinyway.org/",
    };
  },
 
  mounted() {
   document.body.style.background ="#fefef2"
    this.getuserteam();
  }, 
  methods: {
    getuserteam(){
      signSub({
            userId: getParameter("userId"),
          }, "/apiWalk/lx/queryUserTeamByUserId", "post").then(
            (res) => {
              if (res.status == 11003) {
                //11003重新获取token  再执行当前方法
                getToken().then((res) => {
                  if (res.status == 1) {
                    //token没返回的话就不调用当前接口，防止死循环
                    this.getuserteam();
                  }
                });
              } else if (res.status == 1) {
                this.teamList=res.data?res.data.teamUsers:[]
                this.iscusmodal=res.data.teamUsers.every(item=>{
                  return item.thridResult==1
                })

              } else {
                 alert(res.details);
              }
            }
          );
    },
   closesharetipcon() {
      this.iscusmodal = false;
      transmit("pageBack",{})
    },
    
    stopct(e) {
      e.preventDefault();
    }

  },
  watch: {},
};
</script>
<style>
</style>
