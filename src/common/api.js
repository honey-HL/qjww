/**
 * 接口API
 */

import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.21.119:8888/api/'; // 田志勇ip
axios.defaults.baseURL = "https://ask.3ceasy.com/qjww-api/";
// axios.defaults.baseURL = "http://118.178.105.49/";
// axios.defaults.baseURL = 'http://192.168.1.110:8181/qjww-api/';
//axios.defaults.baseURL = 'http://tiger.magic-beans.cn/qjww-api/';
// axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessToken");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout =  10000;

const http = (method, url, params, successCallback, errorCallback) => {
  axios({
    method: method,
    url: url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'token': localStorage.getItem("accessToken")
    },
    params: params
  }).then((response) => {
    // console.log("******************");
    // console.log(params);
    // console.log(url);
    // console.log(response.data);
    if (response.data.code == 200) {
      successCallback(response.data.body);
    }
    else if (response.data.code == 1005) {
      localStorage.removeItem("accessToken");
      errorCallback(response.data);
      //this.$router.push({path: '/index/login'});
    }
    else if (response.data.code == 1050) {
      errorCallback(response.data);
    }
    else {
      //alert(response.data.msg);
      errorCallback(response.data);
    }
  }).catch((error) => {
    errorCallback(error);
  });
}


export default {
  http: http,

  ip: "https://ask.3ceasy.com/qjww-api/",
  // ip: "http://118.178.105.49/",
  // ip: "http://192.168.21.119:8888/api/", // 田志勇ip
  imgIp: "https://ask-img.3ceasy.com/",
  // imgIp: "http://192.168.1.110:8088/",
  //ip: "http://tiger.magic-beans.cn/qjww-api/",
  //imgIp: "http://res.magic-beans.cn/",

  goodsList: 'goods/list',
  exchange: 'goods/exchange',
  searchQuestion: "search/searchQuestion",
  findById: "search/findById",
  questionSave: "search/save",
  questionPraise: "search/praise",
  saveAnswer: "answer/saveAnswer",
  delAnswer: "answer/del",
  findByQuestion: "answer/findByQuestion",
  praise: "answer/praise",

  login: "user/login",
  jsSign: "wxClient/jsSign",
  getCode: "wxClient/getCode",
  getInfo: "user/getInfo",
  getOpenId: "wxClient/getOpenId",
  isGetCode: "wxClient/isGetCode",
  getBindCode: "sms/getBindCode",
  bindPhone: "user/bindPhone",
  updateUser: "user/update",
  updateUserHead:"upload/images",
  getLike: "user/getLike",
  getScore: "user/getScore",
  getGroupAuth: "user/getGroupAuth",

  uploadImage: "uploadImgFile/uploadImage",
  delFile: "uploadImgFile/delFile",
  collectionSave: "questionCollection/save",

  getNotification : "notification/list",

  getCollectionList: "questionCollection/list",
  delCollection: "questionCollection/del/",

  getSelfAnswer: "self/getSelfAnswer",
  getSelfQuestion: "self/getSelfQuestion",

  addSuggest: "suggest/addSuggest",

  saveReport: "report/save",

  getSpecialist: "specialist/list",
  getSpeciainfo: "specialist/info",

  getAdList: "advertisement/getAdv",
  getAdDetail: "advertisement/getAdvDetail",

  getCountScore: "sign/getCountScore",
  getSignData: "sign/getSignData",
  getSignHistory: "sign/getSignHistory",
  isSign: "sign/isSign",
  sign: "sign/sign",

  getText: "systemText/getText",

  getAllCity: "city/getAllCity",

  isRead: "notification/isRead",

  clickRead:"notification/updataIsread",

  countSolveQuestion: "search/countSolveQuestion",

  specialistInfo: "specialist/info",

  getUserByOpenId:"/user/getUserByOpenId",

  pvUploadData:"/pv/uploadData",

  speciaListAddRelation:"/specialist/addRelation",
  speciaListGetRelation:"/specialist/getRelation",

  searchGetQA:"/search/getQA",
  updateNickName:"/user/updateNickName",
}
