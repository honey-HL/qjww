/**根据日期获取星期几 -- 数字 */
const getWeekNumber = (dateString) => {
  let date;
  if (dateString == undefined) {
    date = new Date();
  } else {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  return Number("1234567".charAt(date.getDay()));
}

const changeURLArg = (url, arg, arg_val) => {
  let pattern=arg+'=([^&]*)';
  let replaceText=arg+'='+arg_val;
  if(url.match(pattern)){
    let tmp='/('+ arg+'=)([^&]*)/gi';
    tmp=url.replace(eval(tmp),replaceText);
    return tmp;
  }else{
    if(url.match('[\?]')){
      return url+'&'+replaceText;
    }else{
      return url+'?'+replaceText;
    }
  }
  return url+'\n'+arg+'\n'+arg_val;
}

export default {
  /**1开头的手机号**/
  isMobile : /^1\d{10}$/,
  /**手机号码正则表达式**/
  isPhone : /^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/,
  /**6-16的密码**/
  isPwd : /[A-Za-z0-9]{6,16}/,

  /**验证空**/
  empty: function (value) {
    return value == null || value == "" || typeof(value) == "undefined";
  },
  /**获取url中的参数**/
  getUrlParam : function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if(r != null){
      return unescape(r[2]);
    }else{
      return null; //返回参数值
    }
  },
  getWeekNumber: getWeekNumber,
  changeURLArg: changeURLArg,
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
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
