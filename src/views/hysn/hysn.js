import Vue from 'vue'
import App from './hysnApp'

const appls = new Vue({
  render: h => h(App, {
    ref: 'curapp'
  }),

}).$mount("#app");

// window.postDataNative = function () {
//     return {
//       "swShareUrl": window.location.href,
//       "swShareTitle": appls.$refs.curapp.title,
//       "swShareContent": "点击查看详情"
//     }
  
// }