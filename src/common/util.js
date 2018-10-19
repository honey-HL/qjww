import api from './api'

/**根据日期获取星期几 -- 数字 */
const getWeekNumber = (dateString) => {
  let date;
  if (dateString == undefined) {
    date = new Date();
  } else {
    let dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  return Number("1234567".charAt(date.getDay()));
}

/**获取url中的参数**/
const getUrlParam = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg); //匹配目标参数
  if(r != null){
    return unescape(r[2]);
  }else{
    return null; //返回参数值
  }
}

/**时间格式化**/
const formatting = (timestamp) => {
  var reg = new RegExp("-", "g" )
  timestamp = timestamp.replace(reg,"/");
  timestamp = new Date(timestamp).getTime();

  // 补全为13位
  let arrTimestamp = (timestamp + '').split('');
  for (let start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0';
    }
  }
  timestamp = arrTimestamp.join('') * 1;

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前';
  }

  // 计算差异时间的量级
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;

  // 数值补0方法
  let zero = function (value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (function () {
      let date = new Date(timestamp);
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
    })();
  } else if (monthC >= 1) {
    return parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟前";
  }
  return '刚刚';
}

export default {
  /**1开头的手机号**/
  isMobile : /^1\d{10}$/,
  /**手机号码正则表达式**/
  //isPhone : /^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/,
  isPhone : /^(((13[0-9]{1})|(14[579]{1})|(15[0-9]{1})|(16[6]{1})|(17[36789]{1})|(18[0-9]{1})|(19[89]{1}))+\d{8})$/,
  /**6-16的密码**/
  isPwd : /[A-Za-z0-9]{6,16}/,
  isEmoji : /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,

  /**验证空**/
  empty: function (value) {
    return value == null || value == "" || typeof(value) == "undefined";
  },
  getUrlParam: getUrlParam,
  getWeekNumber: getWeekNumber,
  formatting: formatting,
  splitImg: function (image) {
    if (image) {
      var imgArr = []
      var images_arr = []
      if (image.indexOf(',') == -1) {
        imgArr.push(image)
      } else {
        imgArr = image.split(",")
      }
      for (let i in imgArr) {
        if (imgArr[i].indexOf('http') >= 0) {
          images_arr.push(imgArr[i])
        } else {
          images_arr.push(api.ip + imgArr[i] + '')
        }
      }
      return images_arr
    } else {
      return ''
    }
  }
}



/**转format yyyy-MM-dd HH:mm:ss **/
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

String.prototype.filterImage = function(ip) {
  if(this !== null){
    let index = this.indexOf("http")
    if(index >= 0){
      return this
    }else{
      return ip + this
    }
  }
}
String.prototype.formatHtml = function(){
  return this.replace(/(\n)/g, '')
    .replace(/(\t)/g, '')
    .replace(/(\r)/g, '')
    .replace(/<\/?[^>]*>/g, '')
}
