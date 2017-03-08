import Vue from 'vue'
import Router from 'vue-router'
import { routerAfterEach } from '@plugins/api'

Vue.use(Router)

const NotFound = resolve => require(['@components/App'], resolve)
const Index = resolve => require(['@components/patient/Index'], resolve)

const router = new Router({
  routes: [
    { path: '/', component: Index },
    { path: '/404', component: NotFound, meta: { noteach: true } },
    { path: '*', component: NotFound, meta: { noteach: true } }
  ]
})

router.afterEach(routerAfterEach)

export default router
