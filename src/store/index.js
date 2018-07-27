import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const module = {
    state: {
        //详情数据
        answerDetail: "",
    },
    mutations: {
        //设置详情数据
        setAnswerDetail(state, value) {
            state.answerDetail = value;
        }
    },
    actions: {
        //设置详情数据
        setAnswerDetail(context, value) {
            context.commit("setAnswerDetail", value);
        }
    },
    getters: {},
}

const store = new Vuex.Store(module)
export default store