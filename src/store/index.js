import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const module = {
  state: {
    //问题详情
    answerDetail: null,
    //专家详情
    expertDetail: null,
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
  },
  actions: {
    setAnswerDetail(context, value) {
      context.commit("setAnswerDetail", value);
    },
    setExpertDetail(context, value) {
      context.commit("setExpertDetail", value);
    },
  },
  getters: {},
}

const store = new Vuex.Store(module)
export default store
