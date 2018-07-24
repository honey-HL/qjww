import Vue from 'vue'
import Router from 'vue-router'
import VueWechatTitle from 'vue-wechat-title'
import VueScroller from 'vue-scroller'

import Index from '@/pages/index'
import Home from '@/pages/home'
import Answer from '@/pages/answer'
import My from '@/pages/my'
import Result from '@/pages/result'
import Login from '@/pages/login'
import Quiz from '@/pages/quiz'
import QuizSuccess from '@/pages/quizSuccess'
import News from '@/pages/news'
import ForAnswer from '@/pages/forAnswer'
import AnswerResult from '@/pages/answerResult'
import Report from '@/pages/report'
import IcomeAnswer from '@/pages/icomeAnswer'
import MyAnswer from '@/pages/myAnswer'


Vue.use(VueScroller)
Vue.use(VueWechatTitle)
Vue.use(Router)

const routers = new Router({
  mode: "history",
  routes: [
    { path: '/', redirect: "/index/myAnswer" },
    {
      path: '/index',
      name: 'index',
      redirect: "/index/home",
      component: Index,
      children: [
        { path: 'home', name: 'home', component: Home, meta: { title: "首页" } },
        { path: 'answer', name: 'answer', component: Answer, meta: { title: "问答" } },
        { path: 'my', name: 'my', component: My, meta: { title: "我的" } },
        { path: 'result', name: 'result', component: Result, meta: { title: "搜索结果" } },
        { path: 'login', name: 'login', component: Login, meta: { title: "登录" } },
        { path: 'quiz', name: 'quiz', component: Quiz, meta: { title: "提问" } },
        { path: 'quizSuccess', name: 'quizSuccess', component: QuizSuccess, meta: { title: "提问成功" } },
        { path: 'news', name: 'news', component: News, meta: { title: "通知" } },
        { path: 'forAnswer', name: 'forAnswer', component: ForAnswer, meta: { title: "等你来答" } },
        { path: 'answerResult', name: 'answerResult', component: AnswerResult, meta: { title: "答案搜索结果" } },
        { path: 'report', name: 'report', component: Report, meta: { title: "举报" } },
        { path: 'icomeAnswer', name: 'icomeAnswer', component: IcomeAnswer, meta: { title: "我来回答" } },
        { path: 'myAnswer', name: 'myAnswer', component: MyAnswer, meta: { title: "我的回答" } },
      ]
    },
  ]
})

/**拦截路由 */
routers.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {                                         //如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/index/home');         //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                             //如果匹配到正确跳转
  }
});

export default routers
