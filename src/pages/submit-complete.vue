<script setup lang="ts">
import { useDeliveryInfoStore, usePersonalInfoStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
const personalInfoStore = usePersonalInfoStore()
const deliveryInfoStore = useDeliveryInfoStore()
const { email } = storeToRefs(personalInfoStore)
const { name, phoneNumber, address } = storeToRefs(deliveryInfoStore)
const addressFullStr = computed(() => {
  if (!address.value.zipCode) return ''
  return `${address.value.address} ${address.value.detailAddress}(${address.value.zipCode})`
})
</script>

<template>
  <div class="text-h3 mb-10 text-center">
    <p>"{{ name }}" 님</p>
    <p>회원가입이</p>
    <p>완료되었습니다.</p>
  </div>
  <div class="text-center">
    <p>이메일: {{email}}</p>
    <p>주소: {{ addressFullStr }}</p>
    <p>연락처: {{phoneNumber}}</p>
  </div>
</template>
