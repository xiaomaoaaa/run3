<template>
    <div>
        <div class="header" id="header">
            <h1 >新通新年毅行</h1>
        </div>
        <div class="punchratelist">
            <div class="unit2">
                <div class="number"><img :src="imgurl"></div>
                <div class="borderbox">
                    <div class="logo" :class="{lxc:curitem.islxc,crj:curitem.iscrj}"></div>
                    <div class="info">
                        <p>{{curitem.company}}<span class="ml20">{{curitem.smallname}}</span></p>
                     
                    </div>
                    <div class="rate">
                        <p>总分</p>
                        <p>{{curitem.grade}}分</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="unit" v-for="(item,index) in list" :key="index">
                <div class="number"></div>
                <div class="borderbox">
                    <div class="logo" :class="{lxc:item.islxc,crj:item.iscrj}"></div>
                    <div class="info">
                        <p>{{item.company}}<span class="ml20">{{item.smallname}}</span></p>
                    </div>
                    <div class="rate">
                        <p>总分</p>
                        <p>{{item.grade}}分</p>
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
        <!-- <button @click="jt">截图</button> -->
    </div>
</template>
<script>
import axios from 'axios';
import Lib from 'assets/js/Lib';
require('assets/css/gradelist.css');

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
           
            show1: false,
            text1: '数据加载中...',
            list: [],
            imgurl: '',
            curitem: {},

        }
    },
    methods: {

        gotoindex() {
                window.location.href = "../home/index.vm"
            },


    },
    mounted() {
      
        var curcompany = decodeURI(getParameter("company"));
        // this.show1 = true;
        var self = this;
        var url = document.getElementById('gradelistUrl').value;
         var imgurl=document.getElementById('imgurl').value;
        axios.post(url, {})
            .then(function(response) {
                self.show1 = false;
                if (response.data.rc == 0) {
                    var temarr = [];
                    response.data.obj.companyUserCountList.forEach(function(el,index) {
                        if (el.company == curcompany) {
                            self.imgurl = imgurl+ "img_rank_" + (index + 1) + ".png";
                            self.curitem = el;
                        }
                      
                        var index = el.company.indexOf("（");
                        if (index > -1) {
                            el.smallname = el.company.substring(index);
                            el.company = el.company.substring(0, index);
                        }
                        if (el.id == 5) {
                            el.islxc = true;
                        }
                        if (el.id == 6) {
                            el.iscrj = true;
                        }
                        temarr.push(el);
                    })
                    self.list = temarr;
                    console.log(self.curitem);
                }
            })
            .catch(function(error) {
                self.show1 = false;
            });
    },
    watch: {



    },

}

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
</script>
<style>
</style>
