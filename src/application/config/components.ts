import Vue from 'vue'

import Default from '@/router/layouts/Default.vue'

import Editor from '@/components/helpers/Editor.vue'
import Spinner from '@/components/helpers/Spinner.vue'
import Message from '@/components/helpers/Message.vue'
import MakePayment from '@/components/helpers/payments/MakePayment.vue'

Vue.component('Default', Default)

Vue.component('Editor', Editor)
Vue.component('HelperSpinner', Spinner)
Vue.component('HelperMessage', Message)
Vue.component('MakePayment', MakePayment)
