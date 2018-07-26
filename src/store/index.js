import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const module = {
    state: {
        //搜索关键字
        searchValue: "",
    },
    mutations: {
        //设置关键字
        setSearchValue(state, value) {
            state.searchValue = value;
        }
    },
    actions: {
        //设置关键字
        setSearchValue(context, value) {
            context.commit("setSearchValue", value);
        }
    },
    getters: {},
}

const store = new Vuex.Store(module)
export default store