import Vue from 'vue'

import Default from '@application/router/layouts/Default.vue'

import Editor from '@application/components/helpers/Editor.vue'
import Spinner from '@application/components/helpers/Spinner.vue'
import Message from '@application/components/helpers/Message.vue'
import MakePayment from '@application/components/helpers/payments/MakePayment.vue'
import Banner from '@application/components/helpers/Banner.vue'
import Search from '@application/components/helpers/search/Search.vue'
import RatingStars from '@application/components/helpers/RatingStars.vue'

Vue.component('Default', Default)

Vue.component('editor', Editor)
Vue.component('helper-spinner', Spinner)
Vue.component('helper-message', Message)
Vue.component('make-payment', MakePayment)
Vue.component('banner', Banner)
Vue.component('search', Search)
Vue.component('rating-stars', RatingStars)
