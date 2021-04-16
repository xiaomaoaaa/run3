<template>
  <div class="hysn">
    <div class="banner2"></div>
    <div class="hysncon">
      <p class="intro">
        通过朋友圈、抖音、微博等平台，分享活动集锦（照片与视频）进行集赞，15:00前按照示例上传截图并填写点赞数，全国点赞排名前二十即可获得精美奖品~
      </p>
      <p class="ps">(PS：最终点赞数以工作人员审核为准,请如实填写)</p>
      <div class="huozan">
        <span>我已经获得</span><input type="number" v-model="likeCount" id="lovecounts" @focus="focus" @blur="blur"/><span>个点赞</span>
      </div>
    </div>
    <div class="upload">
      <img :src="uploadtit" class="uploadtipimg" />
      <p class="uploadtip">请按照示例截图上传，最终点赞数以工作人员审核为准</p>
      <div class="upload_warp">
        <!-- <input
          @change="fileChange($event)"
          type="file"
          id="upload_file"
          multiple
          style="display: none"
        /> -->
        <!-- <div class="upload_warp_img">
          <img :src="upload" @click="fileClick"  class="addimg"/>
          <div
            class="upload_warp_img_div"
            v-for="(item, index) of imgList"
            :key="index"
          >
            <img
              :src="delimg"
              class="upload_warp_img_div_del"
              @click="fileDel(index)"
            />

            <img :src="item.file.src" class="listimg" />
          </div>
        </div> -->
        <div class="upload_warp_img">
          <img :src="upload" @click="transmit"  class="addimg"/>
          <div
            class="upload_warp_img_div"
            v-for="(item, index) of imgurllist"
            :key="index"
          >
            <!-- <img
              :src="delimg"
              class="upload_warp_img_div_del"
              @click="fileDel(index)"
            /> -->
            <img :src="baseimg+'thumb/'+item.address" class="listimg" />
          </div>
        </div>
      </div>
       <img :src="cksl"   class="shili" @click="casepage"/>
    </div>
    <div class="fixfoot" :class="{nofixed:isfocus}">
    <div class="combtn2" @click="submitlove">点击上传照片和视频</div>
    <div class="combtn3">本活动最终解释权归集团行政人事中心所有</div>
    </div>
  </div>
</template>
<script>
import { signSub, getToken } from "../../api/api2.js";
import { getParameter, transmit } from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
require("assets/css/task.css");
// const delimg = require("assets/images/icon_iloveyou_close.png");
const upload = require("assets/images/img_iloveyou_adds.png");
const uploadtit = require("assets/images/img_iloveyou_sctp_title.png");
const cksl = require("assets/images/img_iloveyou_cksl.png");
export default {
  components: {},
  data() {
    return {
      imgList: [],
      size: 0,
      // delimg: delimg,
      upload: upload,
      uploadtit: uploadtit,
      cksl:cksl,
      imgurllist:[],
      likeCount:"",
      baseimg: "http://img.qct-test.shinyway.org/",
      isfocus:false
    };
  },

  mounted() {
    document.body.style.background = "#e1e1c7";
    this.getimgurllist()
  },
  methods: {
    focus() {
      this.isfocus=true;
    },
    blur() {
      this.isfocus=false;
    },
    getimgurllist() {
      signSub(
        {
          userId: getParameter("userId"),
          missionId:"6",
        },
        "/apiWalk/lx/queryFileByUserId",
        "post"
      ).then((res) => {
        if (res.status == 11003) {
          //11003重新获取token  再执行当前方法
          getToken().then((res) => {
            if (res.status == 1) {
              //token没返回的话就不调用当前接口，防止死循环
              this.getimgurllist();
            }
          });
        } else if (res.status == 1) {
          if(res.data){
            this.imgurllist=res.data
          }
        } else {
          alert(res.details);
        }
      });
    },
    submitlove() {
      if(!this.likeCount){
        alert("请填写点赞数！")
        document.getElementById("lovecounts").focus()
        return
      }
    if(this.imgurllist.length==0){
        alert("请先上传图片")
        return
      }
  

      signSub(
        {
          userId: getParameter("userId"),
          missionId:"6",
          likeCount:this.likeCount
        },
        "/apiWalk/lx/uploadFileByUserId",
        "post"
      ).then((res) => {
        if (res.status == 11003) {
          //11003重新获取token  再执行当前方法
          getToken().then((res) => {
            if (res.status == 1) {
              //token没返回的话就不调用当前接口，防止死循环
              this.submitlove();
            }
          });
        } else if (res.status == 1) {
          alert("上传成功")
          transmit("pageBack",{})
        } else {
          alert(res.details);
        }
      });
    },
    transmit() {
      transmit("swUploadFile", {
          number: "6",
      });
    },
    casepage() {
      window.location.href="case.html"
    },
    fileClick() {//没做自己上传图片
      // document.getElementById("upload_file").click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = "";
    },
    fileList(files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file) {
      this.size = this.size + file.size; //总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.imgList.push({
          file,
        });
      };
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
  
  },
  watch: {},
};
</script>
<style>
</style>
