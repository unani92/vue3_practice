<template>
  <p class="text-h4 mb-10">2. 배송지 정보입력</p>
  <v-form v-model="form" @keydown.enter="onSubmit" @submit.prevent="onSubmit">
    <InputLabelDefault label="이름">
      <v-text-field
        v-model="name"
        variant="outlined"
        validate-on="blur"
        :rules="[
          v => !!v || '이름을 입력해주세요',
          v =>
            /^([가-힣\s]{2,}|[a-zA-Z]{3,})$/.test(v) ||
            '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳이어야 합니다.',
          v => !/[^가-힣a-zA-Z]/gi.test(v) || '특수문자, 숫자는 허용하지 않습니다.',
        ]"
      />
    </InputLabelDefault>
    <InputLabelDefault label="연락처">
      <v-text-field
        v-model="phoneNumber"
        variant="outlined"
        validate-on="blur"
        :rules="[
          v => !!v || '전화번호를 입력해주세요',
          v => /^0\d{2}[-\s]?\d{3,4}[-\s]?\d{4}$/.test(v) || '올바른 전화번호 형식이 아닙니다.',
        ]"
      />
    </InputLabelDefault>
    <DaumPostCode v-model="address" />
    <v-row>
      <v-col cols="12" sm="6">
        <v-btn @click="onClickPrev" class="text-none my-4" color="white" size="x-large" variant="flat" block>
          이전
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn type="submit" class="text-none my-4" color="indigo-darken-3" size="x-large" variant="flat" block>
          다음
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDeliveryInfoStore } from '@/stores/app'
import { onMounted } from 'vue'
import DaumPostCode from '@/components/DaumPostCode.vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  script.async = true
  document.body.appendChild(script)
})

const router = useRouter()
const deliveryInfoStore = useDeliveryInfoStore()

const form = ref(null)
const name = ref(deliveryInfoStore.name || '')
const phoneNumber = ref(deliveryInfoStore.phoneNumber || '')
const address = ref({
  zipCode: deliveryInfoStore.address.zipCode || '',
  address: deliveryInfoStore.address.address || '',
  detailAddress: deliveryInfoStore.address.detailAddress || '',
})
const onClickPrev = () => {
  router.push('/')
}
const onSubmit = () => {
  if (form.value) {
    deliveryInfoStore.setDeliveryInfo(name.value, phoneNumber.value, {
      zipCode: address.value.zipCode,
      address: address.value.address,
      detailAddress: address.value.detailAddress,
    })
    alert('배송지정보 입력')
    // router.push('/payment')
  }
}
</script>
