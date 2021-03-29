<template>
  <div class="contain"  @click.self="stopevent">
    <!-- <div class="title"></div> -->
    <div class="form" >
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
        <div class="inputitem clearfix">
          <group title label-width="1.42rem">
            <popup-picker
              title="邀请家属"
              :data="isvientlist"
              v-model="isvient"
              placeholder="请选择是否邀请家属"
              confirm-text="确定"
              @on-change="onChangevient"
            ></popup-picker>
          </group>
        </div>
        <div v-show="isrelate">
          <div class="activecon" v-for="(item,index) in homepeoplelist" :key="index">
            <div class="inputitem inputitem3 clearfix" :class="{'delete':index!=0}">
              <group title label-width="1.42rem">
                <popup-picker
                  title
                  :data="homerelatelist"
                  v-model="item.familyRelations"
                  placeholder="请选择家属关系"
                  confirm-text="确定"
                >
                  <template slot="title" slot-scope="props">
                    <!-- use scope="props" when vue < 2.5.0 -->
                    <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                      <span class="delbtn" @click="deletepeople(index, $event)"></span>
                      <span class="dot"></span>
                      <span style="vertical-align:middle;">{{'家属'+(index+1)}}</span>
                    </span>
                  </template>
                </popup-picker>
              </group>
            </div>
            <div class="inputitem inputitem2 clearfix">
              <div class="homename">
                <span>姓名</span>
                <input
                  type="text"
                  placeholder="请填写家属姓名"
                  name="homepeoplename"
                  v-model="item.familyNames"
                  @blur="scroll"
                >
              </div>
              <group title label-width="0.6rem">
                <popup-picker
                  title="年龄"
                  :data="agelist"
                  v-model="item.familyAges"
                  placeholder="请选择"
                  confirm-text="确定"
                ></popup-picker>
              </group>
            </div>
          </div>
        </div>
      </div>
      <div class="addpeoplecon"><div class="addpeople" @click="addhomepeople" v-show="isrelate">+添加家属</div></div>
      <button class="subbtn" @click="submitData">报名</button>
      <a class="signin" href></a>
      <!-- <a class="signin" href>已报名手机号登录</a> -->
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
          "海外投资事业部（含各地）",
          "杭外(含A+)",
          "游学（含各地）",
          "浙江分公司",
          "培优",
          "乐学幼教",
          "安徽",
          "济南",
          "苏州",
          "深圳（含外语）",
          "青岛",
          "上海",
          "山西（含外语）",
          "长春",
          "宁波（含外语、舟山）",
          "广东",
          "成都",
          "重庆",
          "陕西",
          "南京",
          "南昌",
          "福建（含厦门、福州、泉州）",
          "天津",
          "北京（含外语）",
          "集团驻京",
          "温州（含外语）",
          "武汉",
          "河南",
          "长沙",
          "悉尼"
        ]
      ],

      isvientlist: [["是", "否"]],
      agelist: [["0-14", "15-50", "50+"]],
      homerelatelist: [["夫妻","父母", "子女", "兄弟姐妹", "其他"]],
      company: [],
      isvient: [],
      showPositionValue: false,
      homepeoplelist: [
        {
          familyNames: "",
          familyAges: [],
          familyRelations: []
        }
      ],
      isrelate: false
    };
  },
  methods: {
    scroll() {
      blurscrollToTop();
    },
    //
    onChangevient(val) {
      if (val[0] === "是") {
        this.isrelate = true;
      } else {
        this.isrelate = false;
      }
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
          this.showPositionValue = true;
          this.toasttext = res.msg;
        }
      });
    },
    //遍历数组homepeoplelist 不能有字段是非空的
    issubmit() {
      return this.homepeoplelist.every(item => {
        return Object.values(item).every(item2 => {
          return item2.length > 0;
        });
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
      if (this.isvient.length < 1) {
        this.showPositionValue = true;
        this.toasttext = "请选择是否邀请家属";
        return;
      } else {
        if (this.isvient[0] === "是") {
          if (!this.issubmit()) {
            this.showPositionValue = true;
            this.toasttext = "家属信息请填写完整";
            return;
          } else {
            this.homepeoplelist.map(item => {
              let temobj = {
                cstmName: item.familyNames,
                age: item.familyAges[0],
                relations: item.familyRelations[0]
              };
              temarr.push(temobj);
            });
          }
        }
      }
      submitData({
        phoneNo: this.phoneNo,
        password: this.codeNo,
        name: this.name,
        // isvient: this.isvient[0],
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
    addhomepeople() {
      let temObj = {
        familyNames: "",
        familyAges: [],
        familyRelations: []
      };
      this.homepeoplelist.push(temObj);
      //添加之后滚动到最底部
      let domScorllcon = document.querySelector(".scorllcon");
      this.$nextTick(() => {
        domScorllcon.lastElementChild.scrollIntoView(false);
      });
    },
    deletepeople(index, event) {
      event.preventDefault();
      event.stopPropagation();
      this.homepeoplelist.splice(index, 1);
    },
    stopevent(e){
      e.stopPropagation()
      alert("Designed by 张弘 & Made by 毛建飞、林国君")
    }
  },
  mounted() {
    
  }
};
</script>
<style>
</style>
