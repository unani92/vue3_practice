<template>
  <p class="text-h4 mb-10">3. 결제 정보입력</p>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <span>카드번호</span>
    <div
      class="py-4 position-relative card-input-container"
      :class="[showCardNumInvalidUi && 'border-b-lg border-error']"
    >
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="cardNo1" :rules="[v => !!v, v => /^\d{4}$/.test(v)]" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="cardNo2" :rules="[v => !!v, v => /^\d{4}$/.test(v)]" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="cardNo3" :rules="[v => !!v, v => /^\d{4}$/.test(v)]" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="cardNo4" :rules="[v => !!v, v => /^\d{4}$/.test(v)]" />
        </v-col>
      </v-row>
      <span v-if="showCardNumInvalidUi" class="text-red text-caption">유효하지 않은 카드번호입니다.</span>
    </div>
    <v-btn
      v-if="isValidCardNum"
      type="submit"
      class="text-none my-4"
      color="indigo-darken-3"
      size="x-large"
      variant="flat"
      block
    >
      다음
    </v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { usePaymentInfoStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const router = useRouter()
const paymentInfoStore = usePaymentInfoStore()
const { cardNumber } = storeToRefs(paymentInfoStore)
const form = ref(null)
const cardNo1 = ref(cardNumber ? cardNumber.value.slice(0, 4) : '')
const cardNo2 = ref(cardNumber ? cardNumber.value.slice(4, 8) : '')
const cardNo3 = ref(cardNumber ? cardNumber.value.slice(8, 12) : '')
const cardNo4 = ref(cardNumber ? cardNumber.value.slice(12, 16) : '')
const isValidCardNum = computed(() => {
  if (!form.value) return false
  const cardNumArr = [
    ...cardNo4.value.split(''),
    ...cardNo3.value.split(''),
    ...cardNo2.value.split(''),
    ...cardNo1.value.split(''),
  ]
  const multiplyNumArr = cardNumArr.map((num, idx) => {
    if (idx % 2 === 0) {
      const value = Number(num) * 2
      return value > 9 ? value - 9 : value
    }
    return Number(num)
  })
  return multiplyNumArr.reduce((acc, cur) => acc + Number(cur), 0) % 10 === 0
})
const showCardNumInvalidUi = computed(() => form.value && !isValidCardNum.value)
const onSubmit = () => {
  if (form.value && isValidCardNum.value) {
    paymentInfoStore.setPaymentInfo(cardNo1.value + cardNo2.value + cardNo3.value + cardNo4.value)
    router.push('/submit-complete')
  }
}
</script>
<style scoped>
.card-input-container {
  height: 140px;
}
</style>
