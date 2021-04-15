var share = getParameter("share");
var ua = navigator.userAgent; //获取判断用的对象

export var isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export const $baseImgurl = 'http://img.qct-test.shinyway.org//file/h5/';

// export const $proBaseImgurl= 'http://img.qct-test.shinyway.org/';
export const $proBaseImgurl = window.location.host.indexOf('qct-cg.shinyway.org') != -1 ? 'http://img.qct-test.shinyway.org/' : 'http://img-qct-test.shinyway.org/';
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1;
export var isIosQQ = (isIos && / QQ/i.test(navigator.userAgent));
export var isAndroidQQ = (isAndroid && /MQQBrowser/i.test(navigator.userAgent) && /QQ/i.test((navigator.userAgent).split('MQQBrowser')));
export var isWx = /MicroMessenger/i.test(navigator.userAgent);
var isWeibo = /WeiBo/i.test(navigator.userAgent);

export function isphonx() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isIOS) {
    if (screen.height == 812 && screen.width == 375) {
      return true
      //是iphoneX
    } else {
      return false
      //不是iphoneX
    }
  }
}

//获取URL参数
export function getParameter(param) {
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


window.jsBbridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0);
};
//执行原生的方法
export function transmit(name, params) { //String name ,Object params
  //20200701备注  之后的H5页面跳转通用名称和参数
  // name="goWebPageNoShare" params={
  //   title,url
  // }
  if (isIos) { //ios
    if (params) {
      jsBbridge(function (bridge) {
        bridge.callHandler(name, params, function (responseData) {

        })
      })
    } else {
      jsBbridge(function (bridge) {
        bridge.callHandler(
          name, {},
          //回调函数
          function (responseData) {

          }
        )
      })
    }

  } else { //android
    var temparams = JSON.stringify(params);
    if (params) {
      swapp[name](temparams);
    } else {
      swapp[name]();
    }

  }
}
export function blurscrollToTop() {
  //兼容ios12以上的页面被键盘顶上去不滑下来
  // const ua = navigator.userAgent;
  // const regStr_saf = /os [\d._]*/gi;
  // let verinfo = ua.match(regStr_saf);
  // let version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
  // let version_str = version + "";
  // if (version_str != "undefined" && version_str.length > 0) {
  // 	version = version.substring(0, 2);
  // 	if (parseInt(version) >= 12 && isWx) {
  // 		// window.scrollTo(0,scrollTop);
  let currentPosition, timer;
  let speed = 1;
  timer = setInterval(function () {
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed;
    window.scrollTo(0, currentPosition); //页面向下滚动
    clearInterval(timer);
  }, 100);

  // if (isAndroid) {
  // 	window.addEventListener("resize", function () {
  // 		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
  // 			window.setTimeout(function () {
  // 				document.activeElement.scrollIntoViewIfNeeded();
  // 			}, 100);
  // 		}
  // 	})
  // }
  // 	}
  // }
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取安卓传过来的数据
export function getAndroidData(name) {
  try {
    return swapp[name]();
  } catch (err) {
    return ""
  }
}
//删除url中指定的参数  
export function delParam(url, paramKey) {
  var urlParam = window.location.search.substr(1); //页面参数
  var beforeUrl = url.substr(0, url.indexOf("?")); //页面主地址（参数之前地址）
  var nextUrl = "";
  var arr = new Array();
  if (urlParam != "") {
    var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
    for (var i = 0; i < urlParamArr.length; i++) {
      var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
      //如果键雨要删除的不一致，则加入到参数中
      if (paramArr[0] != paramKey) {
        arr.push(urlParamArr[i]);
      }
    }
  }
  if (arr.length > 0) {
    nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url;
}

/**
 * 函数防抖
 * 触发事件后在n秒后执行，如果n秒内又触发事件，则重新计算时间 适合用于搜索框请求列表
 */
export function debounce(fn, wait = 1000) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait)
  }
}

/**
 * 函数节流
 * 触发事件立即执行，但在n秒内连续触发则不执行
 */
export function throttle(fn, wait = 1000) {
  let timer;
  return function () {
    if (timer != null) return;
    let context = this;
    let args = arguments;
    fn.apply(context, args);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  }
}
export function checkPhone(phone) {
  return ((/^1\d{10}$/.test(phone))) ? true : false;
}

export function checkEmail(email) { //邮箱校验
  // var ext = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  var ext = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return ext.test(email);
}
export function thousandSeparator(num) {
  return num && (num
    .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($1, $2) {
      return $2 + ",";
    }) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function ($1, $2) {
      return $2 + ",";
    }));
}

export function validIsEmpty(param) {
  let temarr = [];
  for (let key in param) {
    temarr.push(param[key]);
  }
  return temarr.some(item => {
    return item.length === 0;
  });
}

export function setDocTitle(title) {
  document.getElementsByTagName("title")[0].innerText = title
}

export function interactiveNative(mtdArr=[],swJsjsonArr=[]) {
  let isShare = share == 1 ? true : false;
  if(!isShare){
    // if(!istitle){
    //   document.title='\u200E';
    // }
    mtdArr.map((item,index)=>{
      transmit(item,swJsjsonArr[index])
    })

  }
  
}