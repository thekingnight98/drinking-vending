import Vue from 'vue'
import VueRouter from 'vue-router'
import UserInterface from '../views/UserInterface.vue'
import Stock from '../components/Stock.vue'
import UserPay from '../components/UserPay.vue'
import SendEmail from '../views/contractForm.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserInterface',
    component: UserInterface
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/user-pay',
    name: 'UserPay',
    component: UserPay
  },
  {
    path: '/send-email',
    name: 'SendEmail',
    component: SendEmail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
