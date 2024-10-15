import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceDetail from '../views/InvoiceDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/invoice/:id",
      name: "InvoiceDetail",
      props: true,
      component: InvoiceDetail
    },
  ]
})

export default router
