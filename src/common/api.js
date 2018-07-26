/**
 * 接口API
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.38:8080/qjww-api/';
// axios.defaults.baseURL = 'http://192.168.1.66:2345/qjww-api/';
axios.defaults.headers.common['Authorization'] = '123';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const http = (method, url, params, successCallback, errorCallback) => {
    console.log(params);
    axios({
        method: method,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: params
    }).then((response) => {
        console.log(response);
        if (response.data.code == 200) {
            successCallback(response.data.body);
        }
        else {
            alert(response.data.msg);
            errorCallback(response);
        }
    }).catch((error) => {
        console.log(error);
    });
}


export default {
    http: http,
    ip: "http://192.168.1.38:8080/qjww-api/",
    // ip: "http://192.168.1.66:2345/qjww-api/",
    imgIp: "http://192.168.1.110:8088/qjww-api/",

    searchQuestion: "search/searchQuestion",                                 //搜索问题
    findById: "search/findById",                                             //搜索详情

    login: "user/login",                                                      //登录
    jsSign: "wxClient/jsSign ",
    getCode: "wxClient/getCode",
    getOpenId: "wxClient/getOpenId",
    isGetCode: "wxClient/isGetCode",
    getBindCode: "sms/getBindCode",
    bindPhone: "user/bindPhone",

}