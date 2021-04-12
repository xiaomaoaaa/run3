<template>
  <div class="contain" @click.self="stopevent">
    <!-- <div class="title"></div> -->
    <div class="form">
      <div class="logo"></div>
      <div class="scorllcon">
        <div class="inputitem clearfix">
          <input
            type="tel"
            placeholder="请填写您的报名手机号"
            name="phoneNo"
            id="phoneNo"
            maxlength="11"
            v-model="phoneNo"
            @input="isPhoneNum"
            @blur="scroll"
          >
        </div>
        <div class="inputitem clearfix">
          <input
            type="text"
            placeholder="请填写验证码"
            name="codeNo"
            id="codeNo"
            maxlength="6"
            v-model="codeNo"
            style="width:3rem;"
            @blur="scroll"
          >
          <button @click="getcode" class="validcode" :disabled="isdisabled">{{codetext}}</button>
        </div>
        <div class="inputitem clearfix">
          <input
            type="text"
            placeholder="请填写您的真实姓名"
            name="name"
            id="name"
            maxlength="20"
            v-model="name"
            @blur="scroll"
          >
        </div>
        <div class="inputitem clearfix">
          <group title label-width="1.42rem">
            <popup-picker
              title="分公司"
              :data="companylist"
              v-model="company"
              placeholder="请选择"
              confirm-text="确定"
            ></popup-picker>
          </group>
        </div>
      </div>
      <button class="subbtn" @click="submitData">报名</button>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="3000"
      :text="toasttext"
      position="middle"
      width="2.5rem"
    ></toast>
  </div>
</template>
<script>
import Lib from "assets/js/Lib";
import { getcode, submitData } from "../../api/api.js";
require("assets/css/run.css");
function blurscrollToTop() {
  //兼容ios12以上的页面被键盘顶上去不滑下来
  const ua = navigator.userAgent;
  const regStr_saf = /os [\d._]*/gi;
  let isWx = /MicroMessenger/i.test(ua);
  let verinfo = ua.match(regStr_saf);
  let version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
  let version_str = version + "";
  if (version_str != "undefined" && version_str.length > 0) {
    version = version.substring(0, 2);
    if (parseInt(version) >= 12 && isWx) {
      // window.scrollTo(0,scrollTop);
      let currentPosition, timer;
      let speed = 1;
      timer = setInterval(function() {
        currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition); //页面向上滚动
        currentPosition += speed;
        window.scrollTo(0, currentPosition); //页面向下滚动
        clearInterval(timer);
      }, 100);
    }
  }
}
import { Group, PopupPicker, Toast } from "vux";
export default {
  components: {
    Group,
    PopupPicker,
    Toast
  },
  data() {
    return {
      name: "",
      phoneNo: "",
      isphone: false,
      codetext: "发送验证码",
      codeNo: "",
      isdisabled: true,
      timer: null,
      toasttext: "发送成功",
      companylist: [
        [
         "集团（含小麦）",
          "集团驻京",
          "杭州外语（含A+）",
          "留学浙江分公司",
          "海外投资事业部（含各地）",
          "天津",
          "青岛",
          "山西（含外语）",
          "陕西",
          "长春",
          "河南",
          "成都",
          "广州",
          "济南",
          "南昌",
          "南京",
          "宁波(含舟山、外语)",
          "福州",
          "上海",
          "深圳（含外语）",
          "苏州",
          "温州（含外语）",
          "安徽",
          "重庆",
          "青少大区",
          "初本",
          "长沙",
          "发现教育",
          "武汉",
          "厦门",
          "泉州"
        ]
      ],
      company: [],
      showPositionValue: false,
     
    };
  },
  methods: {
    scroll() {
      blurscrollToTop();
    },

    isPhoneNum() {
      clearInterval(this.timer);
      this.codetext = "发送验证码";
      const phoneNoreg = /^1\d{10}$/;
      if (phoneNoreg.test(this.phoneNo)) {
        this.isphone = true;
        this.isdisabled = false;
      } else {
        this.isdisabled = true;
        this.isphone = false;
      }
    },

    getcode() {
      this.isdisabled = true;
      getcode({ phoneNo: this.phoneNo }).then(res => {
        this.isdisabled = false;
        if (res.rc === 0) {
          this.showPositionValue = true;
          this.toasttext = "发送成功";
          let countdown = 60;
          this.isdisabled = true;
          this.codetext = `${countdown}秒后重试`;
          //启动计时器，1秒执行一次
          this.timer = setInterval(() => {
            if (countdown == 0) {
              clearInterval(this.timer); //停止计时器
              if (this.isphone) {
                this.isdisabled = false;
              } else {
                this.isdisabled = true;
              }
              this.codetext = `发送验证码`;
            } else {
              countdown--;
              this.codetext = `${countdown}秒后重试`;
            }
          }, 1000);
        } else {
          if(res.msg.indexOf("已经报名过")>-1){
            setTimeout(() => {
               window.location.href = "success.html";
            }, 2000);
            
          }
          this.showPositionValue = true;
          this.toasttext = res.msg;
        }
      });
    },

    submitData() {
      let temarr = [];
      if (this.phoneNo.length < 1) {
        this.showPositionValue = true;
        this.toasttext = "请填写您的手机号码";
        return;
      }
      if (this.codeNo.length < 1) {
        this.showPositionValue = true;
        this.toasttext = "请填写验证码";
        return;
      }
      if (this.name.length < 1) {
        this.showPositionValue = true;
        this.toasttext = "请填写您的姓名";
        return;
      }
      if (this.company.length < 1) {
        this.showPositionValue = true;
        this.toasttext = "请选择公司";
        return;
      }

      submitData({
        phoneNo: this.phoneNo,
        password: this.codeNo,
        name: this.name,
        company: this.company[0],
        userFamilyList: temarr
      }).then(res => {
        if (res.rc === 0) {
          this.showPositionValue = true;
          this.toasttext = "报名成功";
          window.location.href = "success.html";
        } else {
          this.showPositionValue = true;
          this.toasttext = res.msg;
        }
      });
    },

 
    stopevent(e) {
      e.stopPropagation()
      // alert("Designed by 张弘 & Made by 毛建飞、林国君")
    }
  },
  mounted() {
    
  }
};
</script>
<style>
</style>
