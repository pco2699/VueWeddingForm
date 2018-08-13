// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { MdButton, MdToolbar, MdField, MdRadio, MdSnackbar, MdProgress } from 'vue-material/dist/components'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import config from './firebaseConfig'

Vue.use(MdButton)
Vue.use(MdToolbar)
Vue.use(MdField)
Vue.use(MdRadio)
Vue.use(MdSnackbar)
Vue.use(MdProgress)
Vue.use(VueFire)

firebase.initializeApp(config)
export const db = firebase.firestore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
