// Utilities
import { defineStore } from 'pinia'

export const usePersonalInfoStore = defineStore('personalInfo', {
  state: () => ({
    email: '' as string,
    password: '' as string,
  }),
  actions: {
    setPersonalInfo(email: string, password: string) {
      this.email = email
      this.password = password
    },
  },
})

export const useDeliveryInfoStore = defineStore('deliveryInfo', {
  state: () => ({
    name: '' as string,
    phoneNumber: '' as string,
    address: {} as {
      zipCode: string
      address: string
      detailAddress?: string
    },
  }),
  actions: {
    setDeliveryInfo(
      name: string,
      phoneNumber: string,
      address: { zipCode: string; address: string; detailAddress?: string }
    ) {
      this.name = name
      this.phoneNumber = phoneNumber
      this.address = address
    },
  },
})

export const usePaymentInfoStore = defineStore('paymentInfo', {
  state: () => ({
    cardNumber: '' as string,
  }),
  actions: {
    setPaymentInfo(cardNumber: string) {
      this.cardNumber = cardNumber
    },
  },
})
