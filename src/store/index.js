import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const module = {
  state: {
    // 问题详情
    answerDetail: null,
    // 专家详情
    expertDetail: null,
    // openId
    openId: null,
    // 显示启动页
    isShowAd: true,
    // 广告位详情
    adDetail: null,
    // 登录token
    token: null,
    // 分享数据
    share: null,
    //分享url
    sharedUrl: null,
  },
  mutations: {
    setAnswerDetail(state, value) {
      state.answerDetail = value
    },
    setExpertDetail(state, value) {
      state.expertDetail = value
    },
    setOpenId(state, value) {
      state.openId = value
    },
    setIsShowAd(state, value) {
      state.isShowAd = value
    },
    setAdDetail(state, value) {
      state.adDetail = value
    },
    setToken(state, value) {
      state.token = value
    },
    setShare(state, value) {
      state.share = value
    },
    setSharedUrl(state, value) {
      state.sharedUrl = value
    }
  },
  actions: {
    setAnswerDetail(context, value) {
      context.commit('setAnswerDetail', value)
    },
    setExpertDetail(context, value) {
      context.commit('setExpertDetail', value)
    },
    setOpenId(context, value) {
      context.commit('setOpenId', value)
    },
    setIsShowAd(context, value) {
      context.commit('setIsShowAd', value)
    },
    setAdDetail(context, value) {
      context.commit('setAdDetail', value)
    },
    setToken(context, value) {
      context.commit('setToken', value)
    },
    setShare(context, value) {
      context.commit('setShare', value)
    },
    setSharedUrl(context, value) {
      context.commit('setSharedUrl', value)
    }
  },
  getters: {
    getShare: status => {
     return status.share
    }
  }
}

const store = new Vuex.Store(module)
export default store
