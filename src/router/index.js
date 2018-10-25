import Vue from 'vue'
import Router from 'vue-router'
import VueWechatTitle from 'vue-wechat-title'
import VueScroller from 'vue-scroller'
import store from '../store'

const Index = () => import('@/pages/index')
const Home = () => import('@/pages/home')
const Answer = () => import('@/pages/answer')
const My = () => import('@/pages/my')
const Result = () => import('@/pages/result')
const Login = () => import('@/pages/login')
const Quiz = () => import('@/pages/quiz')
const QuizSuccess = () => import('@/pages/quizSuccess')
const News = () => import('@/pages/news')
const ForAnswer = () => import('@/pages/forAnswer')
const AnswerResult = () => import('@/pages/answerResult')
const Report = () => import('@/pages/report')
const IcomeAnswer = () => import('@/pages/icomeAnswer')
const MyAnswer = () => import('@/pages/myAnswer')
const Expert = () => import('@/pages/expert')
const ExpertDetail = () => import('@/pages/expertDetail')
const MyCollection = () => import('@/pages/myCollection')
const Feedback = () => import('@/pages/feedback')
const Signin = () => import('@/pages/signin')
const Edit = () => import('@/pages/edit')
const Rule = () => import('@/pages/rule')
const Content = () => import('@/pages/content')
const NewsDetail = () => import('@/pages/newsDetail')
const ChangeName = () => import('@/pages/changeName')
const Share = () => import('@/pages/share')


Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(VueScroller)
Vue.use(VueWechatTitle)
Vue.use(Router)

const routers = new Router({
  // mode: "history",
  base:"/wechat/",
  routes: [
    { path: '/', redirect: "/index/home" },
    {
      path:'/share',
      name: 'share',
      component: Share
    },
    {
      path: '/index',
      name: 'index',
      redirect: "/index/home",
      component: Index,
      children: [
        { path: 'home', name: 'home', component: Home, meta: { title: "首页" ,defaultShare : true } },
        { path: 'answer', name: 'answer', component: Answer, meta: { title: "问答" ,defaultShare : true } },
        { path: 'my', name: 'my', component: My, meta: { title: "我的", requireAuth: true ,defaultShare : true } },
        { path: 'result', name: 'result', component: Result, meta: { title: "搜索结果" ,defaultShare : true } },
        { path: 'login', name: 'login', component: Login, meta: { title: "登录" ,defaultShare : true } },
        { path: 'quiz', name: 'quiz', component: Quiz, meta: { title: "提问", requireAuth: true ,defaultShare : false } },
        { path: 'quizSuccess', name: 'quizSuccess', component: QuizSuccess, meta: { title: "提问成功", requireAuth: true ,defaultShare : false } },
        { path: 'news', name: 'news', component: News, meta: { title: "通知", requireAuth: true ,defaultShare : true } },
        { path: 'newsDetail', name: 'newsDetail', component: NewsDetail, meta: { title: "通知详情", requireAuth: true ,defaultShare : true } },
        { path: 'forAnswer', name: 'forAnswer', component: ForAnswer, meta: { title: "等你来答", requireAuth: true ,defaultShare : true } },
        { path: 'answerResult', name: 'answerResult', component: AnswerResult, meta: { title: "答案搜索结果", requireAuth: false  ,defaultShare : false } },
        { path: 'report', name: 'report', component: Report, meta: { title: "举报", requireAuth: true ,defaultShare : true } },
        { path: 'icomeAnswer', name: 'icomeAnswer', component: IcomeAnswer, meta: { title: "我来回答", requireAuth: true ,defaultShare : true } },
        { path: 'myAnswer', name: 'myAnswer', component: MyAnswer, meta: { title: "我的回答", requireAuth: true ,defaultShare : true } },
        { path: 'expert', name: 'expert', component: Expert, meta: { title: "专家", requireAuth: true ,defaultShare : true } },
        { path: 'expertDetail', name: 'expertDetail', component: ExpertDetail, meta: { title: "专家--详情", requireAuth: true ,defaultShare : true } },
        { path: 'myCollection', name: 'myCollection', component: MyCollection, meta: { title: "我的收藏", requireAuth: true ,defaultShare : true } },
        { path: 'feedback', name: 'feedback', component: Feedback, meta: { title: "意见反馈", requireAuth: true ,defaultShare : true } },
        { path: 'signin', name: 'signin', component: Signin, meta: { title: "签到", requireAuth: true ,defaultShare : true } },
        { path: 'edit', name: 'edit', component: Edit, meta: { title: "编辑资料", requireAuth: true ,defaultShare : true } },
        { path: 'rule', name: 'rule', component: Rule, meta: { title: "积分规则说明" ,defaultShare : true } },
        { path: 'content', name: 'content', component: Content, meta: { title: "详情" ,defaultShare : true } },
        { path: 'changeName', name: 'changeName', component: ChangeName, meta: { title: "修改名称" ,defaultShare : true } },
      ]
    },
  ]
})

/**拦截路由 */
routers.beforeEach((to, from, next) => {

  console.log("goto ===>",to)
  if(to.path.indexOf("answerResult") < 0){
    document.title  = to.meta.title;
  }
  if (to.matched.length === 0) {                                         //如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/index/home');         //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  }
  else if (to.meta.requireAuth) { //需要验证
    if (!localStorage.getItem("accessToken")) {
      next({
        path: '/index/login',
        query: { redirect: to.fullPath }
      })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
  if(to.meta.defaultShare == true){
    store.dispatch("setShare", {});
  }
});

export default routers
