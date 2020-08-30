import Vue from 'vue'

import Default from '@/router/layouts/Default.vue'

import Editor from '@/components/helpers/Editor.vue'
import Spinner from '@/components/helpers/Spinner.vue'
import Message from '@/components/helpers/Message.vue'
import MakePayment from '@/components/helpers/payments/MakePayment.vue'
import Banner from '@/components/helpers/Banner.vue'
import Search from '@/components/helpers/search/Search.vue'

Vue.component('Default', Default)

Vue.component('editor', Editor)
Vue.component('helper-spinner', Spinner)
Vue.component('helper-message', Message)
Vue.component('make-payment', MakePayment)
Vue.component('banner', Banner)
Vue.component('search', Search)
