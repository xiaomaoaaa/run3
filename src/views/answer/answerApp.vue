<template>
  <div class="answer">
    <div class="fiexddiv">
      <h3>
        你参加过的课外项目
       
      </h3>
      <ul class="nationOptionscon projectsOptionscon" style="line-height: 1rem">
        <li v-for="item in queOptions" :key="item.id" class="labelcon">
          <label>
            <input
              type="radio"
              name="opt"
              :value="item.id"
              v-model="answer"
           
            />
            <p>{{ item.name }}</p>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getParameter, transmit, setDocTitle } from "assets/js/until.js";
import Lib from "assets/js/Lib.js";
require("assets/css/agreement.css");
require("assets/css/task.css");
const bg_head = require("assets/images/bg_head.jpg");
const bg_head2 = require("assets/images/bg_head2.jpg");
export default {
  components: {},
  data() {
    return {
      answer:"",
      queOptions:[{id:1,name:"第一题"},{id:2,name:"第2题"},{id:3,name:"第3题"},{id:4,name:"第4题"}]
    }
  },
  methods: {
    slected(item) {
       
     
    },
  },
  mounted() {},
  watch: {},
};
</script>
<style>
</style>
