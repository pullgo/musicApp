import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

/* eslint-disable no-unused-vars */
import 'common/stylus/index.styl'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
