/**
 * 接口API
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://1ek8059026.51mypc.cn:13776/qjww-api/';
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
    console.log("******************");
    console.log(params);
    console.log(url);
    console.log(response.data);
    if (response.data.code == 200) {
      successCallback(response.data.body);
    }
    else if (response.data.code == 1005) {
      localStorage.removeItem("accessToken");
      //this.$router.push({path: '/index/login'});
    }
    else {
      alert(response.data.msg);
      errorCallback(response.data);
    }
  }).catch((error) => {
    console.log(error);
    errorCallback(error);
  });
}


export default {
  http: http,
  ip: "http://1ek8059026.51mypc.cn:13776/qjww-api/",
  imgIp: "http://1ek8059026.51mypc.cn:13599/qjww-api/",

  searchQuestion: "search/searchQuestion",
  findById: "search/findById",
  questionSave: "search/save",
  questionPraise: "search/praise",
  saveAnswer: "answer/saveAnswer",
  delAnswer: "answer/del",
  findByQuestion: "answer/findByQuestion",
  praise: "answer/praise",

  login: "user/login",
  jsSign: "wxClient/jsSign ",
  getCode: "wxClient/getCode",
  getInfo: "user/getInfo",
  getOpenId: "wxClient/getOpenId",
  isGetCode: "wxClient/isGetCode",
  getBindCode: "sms/getBindCode",
  bindPhone: "user/bindPhone",
  updateUser: "user/update",
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








}
