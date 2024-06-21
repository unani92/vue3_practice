<script setup lang="ts">
import { onMounted } from 'vue'
import { ru } from 'vuetify/locale'

const model = defineModel<{ zipCode: string; address: string; detailAddress?: string }>()
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  script.async = true
  document.body.appendChild(script)
})
const addressDetail = computed(() =>
  model.value?.address && model.value.zipCode ? `(${model.value?.zipCode}) ${model.value!.address}` : ''
)
const onClickSearchAddress = () => {
  new daum.Postcode({
    oncomplete: data => {
      model.value!.zipCode = data.zonecode
      model.value!.address = data.address
    },
  }).open()
}

const onClickAddressDetailInput = () => {
  if (!addressDetail.value) {
    onClickSearchAddress()
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <span>주소</span>
    </v-col>
    <v-col cols="12" sm="6">
      <v-btn @click="onClickSearchAddress">주소검색</v-btn>
    </v-col>
  </v-row>
  <div class="mt-4">
    <v-text-field
      @click="onClickAddressDetailInput"
      variant="outlined"
      readonly
      :model-value="addressDetail"
      :rules="[v => !!v]"
    />
    <v-text-field variant="outlined" v-model="model!.detailAddress" :rules="[v => !!v || '상세주소를 입력해주세요']" />
  </div>
</template>
