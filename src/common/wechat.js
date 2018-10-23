import api from './api'
var isWeChatInit = false
var shareData = null
var logo = ''
var newVersion = false

const init = () => {
  // let url = "https://ask.3ceasy.com"
  let url = window.location.href.split('#')[0]
  let baseUrl = url.split('?')[0]
  logo = baseUrl + '/static/logo.png'
  console.log("init ==> wechat")
  api.http('get', api.jsSign, {url: url}, result => {
    console.log("config ===>",JSON.stringify(result))
    wx.config({
      debug: false,
      appId: result.appId,
      timestamp: result.timestamp,
      nonceStr: result.noncestr,
      signature: result.signature,
      jsApiList: [
        'checkJsApi', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'updateAppMessageShareData', 'hideAllNonBaseMenuItem', 'showMenuItems'
      ]
    })
    wx.checkJsApi({
      jsApiList: ['updateTimelineShareData'],
      success: res => {
        newVersion = res.checkResult.updateTimelineShareData
      }
    })
    isWeChatInit = true
    if (shareData != null) {
      readyShareData(shareData)
    }else{
      readyShareData({})
    }
  }, (error) => {
    console.log(error)
  })
}

const setShareData = (data) => {
  // window.alert('setShareData43====>' + JSON.stringify(data))
  shareData = data
  if (isWeChatInit) {
    readyShareData(shareData)
  }
}
function readyShareData (data) {
  if (!data.hasOwnProperty('link')) {
    data = {
      link: window.location.href.split(/[?#]/)[0],
      title: '活力开学季 答题积分拿奖品',
      desc: '我已经在活动里拿到了奖品！轻松答题拿积分'
    }
  }
  console.log('share ready ==>', JSON.stringify(data))
  wx.ready(() => {
    let shareData = {
      title: data.title == null ? '千机问问' : data.title,
      link: data.link,
      desc: data.link,
      imgUrl: data.image == null || data.image.length === 0 ? logo : data.image,
      success: function () {},
      cancel: function () {}
    }
    console.log('shareData ======>' + JSON.stringify(shareData))
    if (newVersion) {
      wx.updateTimelineShareData(shareData)
      wx.updateAppMessageShareData(shareData)
    }else {
      wx.onMenuShareAppMessage(shareData)
      wx.onMenuShareTimeline(shareData)
    }
  })
}

export default {
  init: init,
  setShareData: setShareData
}
