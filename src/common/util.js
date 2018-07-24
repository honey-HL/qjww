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
}