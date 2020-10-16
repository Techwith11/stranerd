import Vue from 'vue'

import Default from '@application/router/layouts/Default.vue'
import Auth from '@application/router/layouts/Auth.vue'

import Editor from '@application/components/helpers/Editor.vue'
import Loading from '@application/components/helpers/Loading.vue'
import PageLoading from '@/components/helpers/PageLoading.vue'
import Message from '@application/components/helpers/Message.vue'
import MakePayment from '@application/components/helpers/payments/MakePayment.vue'
import Banner from '@application/components/helpers/Banner.vue'
import Search from '@application/components/helpers/search/Search.vue'
import RatingStars from '@application/components/helpers/RatingStars.vue'

Vue.component('Default', Default)
Vue.component('Auth', Auth)

Vue.component('editor', Editor)
Vue.component('loading', Loading)
Vue.component('page-loading', PageLoading)
Vue.component('helper-message', Message)
Vue.component('make-payment', MakePayment)
Vue.component('banner', Banner)
Vue.component('search', Search)
Vue.component('rating-stars', RatingStars)
