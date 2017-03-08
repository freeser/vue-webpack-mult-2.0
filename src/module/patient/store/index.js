import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
// import mutations from './mutations'
// import cart from './modules/cart'
// import products from './modules/products'
import createLogger from '../../../plugins/logger'

Vue.use(Vuex)

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  // mutations,
  // modules: {
  //   cart,
  //   products
  // },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
