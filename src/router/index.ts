/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useDeliveryInfoStore, usePersonalInfoStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach((to, from, next) => {
  // Add your custom logic here
  const personalInfoStore = usePersonalInfoStore()
  const deliveryInfoStore = useDeliveryInfoStore()
  const { email, password } = storeToRefs(personalInfoStore)
  const { name, phoneNumber, address } = storeToRefs(deliveryInfoStore)
  if (to.path === '/delivery-info') {
    if (!(email.value && password.value)) {
      next('/')
    }
  }
  if (to.path === '/payment-info') {
    if (!(email.value && password.value)) {
      next('/')
    }
    if (!(name.value && phoneNumber.value && address.value)) {
      next('/delivery-info')
    }
  }
  next()
})

export default router
