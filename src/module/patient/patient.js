import Vue from 'vue'
import App from './Modules'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'

Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
