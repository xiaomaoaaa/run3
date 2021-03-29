<template>
    <div>
        <div class="header2" id="header2">
            <!--   <div class="imgcon2" @click="gotoindex"><img :src="returnimg" class="return"></div> -->
            <p>{{companyfristname}}<span class="companytip">{{companysecondname}}</span>人均贡献</p>
            <div class="bg22"></div>
        </div>
        <div class="header" id="header">
            <!-- <div class="imgcon" @click="gotoindex"><img :src="returnimg" class="return"></div> -->
            <h1 class="headertit">{{companyfristname}}<span class="companytip">{{companysecondname}}</span><span>人均贡献</span></h1>
        </div>
        <div class="percontributionlist">
            <p>展示不足3公里的信息，但不计入「人均贡献」</p>
            <div class="unitlist">
                <div class="unit" :class="{female:item.gender=='FEMALE'}" v-for="item in list">
                    <div class="info">
                        <p>{{item.name}}<span class="ml20">{{item.gender=="FEMALE"?"(女)":"(男)"}}</span></p>
                        <p><span>{{item.phoneno}}</span></p>
                    </div>
                    <div class="achievement">
                        <p>{{item.miles}}公里</p>
                        <p><span>{{item.endTime}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom clearfix">
            <div class="left"></div>
            <div class="mid">没有更多了</div>
            <div class="right"></div>
        </div>
        <loading :show="show1" :text="text1"></loading>
    </div>
</template>
<script>
import axios from 'axios';
import Lib from 'assets/js/Lib';
require('assets/css/percontribution.css');
var returnimg = require('assets/images/icon_navbar_back.png');
import {
    Loading
}
from 'vux'
export default {
    components: {
        Loading
    },
    data() {
        return {
            returnimg: returnimg,
            show1: false,
            text1: '数据加载中...',
            list: [],
            companyfristname: "",
            companysecondname: ""
        }
    },
    methods: {


    },
    mounted() {
       
        var pagetitle=decodeURI(getParameter("company"));
        document.title = pagetitle;
        var index = pagetitle.indexOf("（");
        if (index > -1) {
            this.companysecondname = pagetitle.substring(index);
            this.companyfristname = pagetitle.substring(0, index);
        } else {
            this.companyfristname = pagetitle;
            this.companysecondname = "";
        }
        //打包需要注释开始
        // var temarr = [];
        //     this.list.forEach(function(el) {
        //         el.miles = (el.miles / 1000).toFixed(1);
        //         el.phoneno = formatmobile(el.phoneno, '3 4 4');
        //         el.endTime = el.endTime.substring(0, 16);
        //         temarr.push(el);
        //     })
        // this.list = temarr;
       //打包需要注释结束

        this.show1 = true;
        var self = this;
        var url = document.getElementById('percontributionUrl').value;
        axios.post(url, {}, {
                params: {
                    company: pagetitle,
                }
            })
            .then(function(response) {
                self.show1 = false;
                if (response.data.rc == 0) {
                    var temarr = [];
                    response.data.obj.forEach(function(el) {
                        el.miles=(el.miles/1000).toFixed(1);
                        el.phoneno=formatmobile(el.phoneno,'3 4 4');
                        el.endTime=el.endTime.substring(0,16);
                        temarr.push(el);
                    })
                    self.list = temarr;
                }
            })
            .catch(function(error) {
                self.show1 = false;
            });
    },
    watch: {



    },

}
window.onscroll = function() {
        //变量t就是滚动条滚动时，到顶部的距离
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var header2 = document.getElementById("header2"),
            header = document.getElementById("header");
        if (t >= 100) { //当拖动到距离顶部100px处时，左边导航固定，不随滚动条滚动
            header2.style.display = "block";
            header.style.display = "none";
        } else {
            header2.style.display = "none";
            header.style.display = "block";
        }
    }
    // 获取url的字符串参数
function getParameter(param) {
    var query = window.location.search;
    var iLen = param.length;
    var iStart = query.indexOf(param);
    if (iStart == -1)
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1) {
        return query.substring(iStart);
    }

    return query.substring(iStart, iEnd);
}

function formatmobile(num, str) {
    var renum = ""; //函数返回对象
    var arr = new Array();
    var i, m = 0,
        n;
    if (str.indexOf('-') > -1) {
        arr = str.split("-");
        for (i = 0; i < arr.length; i++) {
            n = m + Number(arr[i]);
            renum += num.substring(m, n);
            if (i < arr.length - 1) renum += "-";
            m = n;
        }
    } else {
        arr = str.split(" ");
        for (i = 0; i < arr.length; i++) {
            n = m + Number(arr[i]);
            renum += num.substring(m, n);
            if (i < arr.length - 1) renum += " ";
            m = n;
        }
    }
    return renum;
}

function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, ""); //过滤首尾空格为空
}
</script>
<style>
</style>
