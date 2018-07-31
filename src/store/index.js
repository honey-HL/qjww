import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const module = {
  state: {
    //问题详情
    answerDetail: null,
    //专家详情
    expertDetail: null,
    //openId
    openId: null,
  },
  mutations: {
    //设置问题详情
    setAnswerDetail(state, value) {
      state.answerDetail = value;
    },
    //设置专家详情
    setExpertDetail(state, value) {
      state.expertDetail = value;
    },
    //openId
    setOpenId(state, value) {
      state.openId = value;
    },
  },
  actions: {
    setAnswerDetail(context, value) {
      context.commit("setAnswerDetail", value);
    },
    setExpertDetail(context, value) {
      context.commit("setExpertDetail", value);
    },
    setOpenId(context, value) {
      context.commit("setOpenId", value);
    },
  },
  getters: {},
}

const store = new Vuex.Store(module)
export default store
