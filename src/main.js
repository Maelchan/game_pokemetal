import Vue from 'vue'
import App from './App.vue'
import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'

Vue.component('v-icon', Icon)

Vue.filter('uppercase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
})

new Vue({
  el: '#app',
  render: h => h(App),
})
