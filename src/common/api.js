/**
 * 接口API
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.38:8080/qjww-api/';
// axios.defaults.baseURL = 'http://192.168.1.66:2345/qjww-api/';
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessToken");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout =  3000;

const http = (method, url, params, successCallback, errorCallback) => {
    console.log(params);
    axios({
        method: method,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'token': localStorage.getItem("accessToken")
        },
        params: params
    }).then((response) => {
        console.log(response);
        if (response.data.code == 200) {
            successCallback(response.data.body);
        }
        else {
            this.$toast(response.data.msg);
            errorCallback(response.data);
        }
    }).catch((error) => {
        console.log(error);
        errorCallback(error);
    });
}


export default {
    http: http,
    ip: "http://192.168.1.38:8080/qjww-api/",
    // ip: "http://192.168.1.66:2345/qjww-api/",
    imgIp: "http://192.168.1.110:8088/qjww-api/",

    searchQuestion: "search/searchQuestion",                                 //搜索问题
    findById: "search/findById",                                             //搜索详情
    questionSave: "search/save",
    questionPraise: "search/praise",
    saveAnswer: "answer/saveAnswer",
    findByQuestion: "answer/findByQuestion",
    praise: "answer/praise",

    login: "user/login",                                                      //登录
    jsSign: "wxClient/jsSign ",
    getCode: "wxClient/getCode",
    getInfo: "user/getInfo",
    getOpenId: "wxClient/getOpenId",
    isGetCode: "wxClient/isGetCode",
    getBindCode: "sms/getBindCode",
    bindPhone: "user/bindPhone",
    bindPhone: "user/bindPhone",

    uploadImage: "uploadImgFile/uploadImage",
    delFile: "uploadImgFile/delFile",
    collectionSave: "questionCollection/save",

    getNotification : "notification/list",


}
