<template>
  <p class="text-h4 mb-10">3. 결제 정보입력</p>
  <v-form v-model="form">
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
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const form = ref(null)
const cardNo1 = ref('')
const cardNo2 = ref('')
const cardNo3 = ref('')
const cardNo4 = ref('')
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
</script>
<style scoped>
.card-input-container {
  height: 140px;
}
</style>
