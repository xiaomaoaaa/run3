require('assets/css/reset.css');
//解决click点击300毫秒延时问题
// import FastClick from 'fastclick';
// FastClick.attach(document.body);
//自适应代码
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {

			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 750) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);

	doc.addEventListener('DOMContentLoaded', recalc, false);
	/*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
})(document, window);
const longbg = require("assets/images/longbg.jpg");
const shortbg = require("assets/images/shortbg.jpg");
if (screen.height / screen.width > 2) {
	//用长图片给body做背景
	document.body.style.background =
	  "url('" + longbg + "') no-repeat center -80px";
	document.body.style.backgroundSize = "100% auto";
  } else {
	document.body.style.background =
	  "url('" + shortbg + "') no-repeat center -60px";
	document.body.style.backgroundSize = "100% auto";
	}
