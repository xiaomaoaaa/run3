<template>
  <div>
    <!-- <div class="unit" id="self">
      <div class="number" :class="{one:curitem.rank==1}" v-if="curitem.rank==1"></div>
      <div class="number" :class="{two:curitem.rank==2}" v-if="curitem.rank==2"></div>
      <div class="number" :class="{three:curitem.rank==3}" v-if="curitem.rank==3"></div>
      <div class="number greater3" v-if="curitem.rank>3">
        <img :src="imgurl" >
      </div>
      <div class="borderbox">
        <div class="info">
          <p class="logo" :class="{lxc:curitem.islxc,crj:curitem.iscrj}">
            {{curitem.company}}
            <span class="ml20">{{curitem.smallname}}</span>
          </p>
          <p>
            <span class="w100">总人数：{{curitem.employeeCount}}人</span>
            <span class="ml50">报名人数：{{curitem.userCount}}</span>
          </p>
        </div>
        <div class="rate">
          <p>打卡率</p>
          <p>{{curitem.applyRate}}%</p>
        </div>
      </div>
    </div>-->
    <p id="toptip">*此排行榜一分钟刷新一次</p>
    <div id="punchratelist">
      <div class="unit" v-for="(item, index) in list" :key="index">
        <div class="number"></div>
        <div class="borderbox">
          <div class="info">
            <p class="logo" :class="{ lxc: item.islxc, crj: item.iscrj }">
              {{ item.company }}
              <span>{{ item.smallname }}</span>
            </p>
            <p>
              <span class="w100">总人数：{{ item.employeeCount }}人</span>
              <span>报名人数：{{ item.userCount }}</span>
            </p>
          </div>
          <div class="rate">
            <p>打卡率</p>
            <p>{{ item.applyRate }}%</p>
          </div>
        </div>
      </div>
    </div>

    <loading :show="show1" :text="text1"></loading>
  </div>
</template>
<script>
import { signSub, getToken } from "../../api/api2.js";
import Lib from "assets/js/Lib";
require("assets/css/punchrate.css");

import { Loading } from "vux";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      show1: false,
      text1: "数据加载中...",
      list: [],
      imgurl: "",
      curitem: {
        id: 6,
        company: "海外投资事业部（含各地）",
        employeeCount: "77",
        userCount: "0",
        applyRate: "0",
        iscrj: true,
        rank: 5,
      },
    };
  },
  methods: {
    getratelist() {
      //根据请求结果来渲染对应排名
      signSub({}, "/apiWalk/lx/selectUserApplyList", "post").then((res) => {
        if (res.status == 11003) {
          //11003重新获取token  再执行当前方法
          getToken().then((res) => {
            if (res.status == 1) {
              //token没返回的话就不调用当前接口，防止死循环
              this.getratelist();
            }
          });
        } else if (res.status == 1) {
          let temarr = [];
          let temlist = res.data.companyUserCountList;
          temlist.map((el) => {
            let index = el.company.indexOf("（");
            let index2 = el.company.indexOf("(");
            if (index2 > -1) {
              el.smallname = el.company.substring(index2);
              el.company = el.company.substring(0, index2);
            }
            if (index > -1) {
              el.smallname = el.company.substring(index);
              el.company = el.company.substring(0, index);
            }
            if (el.id == 6) {
              el.iscrj = true;
            }
            if (el.id == 36) {
              el.islxc = true;
            }
            temarr.push(el);
          });
          this.list = temarr;
        } else {
          alert("网络连接失败");
        }
      });
    },
  },
  mounted() {
    // let selfboxH = document.querySelector("#self").offsetHeight;
    // let listboxH = document.documentElement.clientHeight - selfboxH - 10; //浏览器可视高度减去div#self高度和一个div#line的高度
    document.querySelector("#punchratelist").style.height =
      document.documentElement.clientHeight + "px";
    this.getratelist();

    // let i = 12;
    // this.imgurl = require("assets/images/" + i + ".png");
  },
  watch: {},
};

function getParameter(param) {
  var query = window.location.search;
  var iLen = param.length;
  var iStart = query.indexOf(param);
  if (iStart == -1) return "";
  iStart += iLen + 1;
  var iEnd = query.indexOf("&", iStart);
  if (iEnd == -1) {
    return query.substring(iStart);
  }

  return query.substring(iStart, iEnd);
}
</script>
<style>
</style>
