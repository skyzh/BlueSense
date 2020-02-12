import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

const VueTimeago = require('vue-timeago')

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
