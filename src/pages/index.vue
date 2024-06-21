<template>
  <p class="text-h4 mb-10">1. 개인정보 입력</p>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <InputLabelDefault label="이메일">
      <v-text-field
        v-model="email"
        variant="outlined"
        validate-on="blur"
        :rules="[v => !!v || '이메일을 입력해주세요', v => /.+@.+\..+/.test(v) || '올바른 이메일 형식이 아닙니다.']"
      />
    </InputLabelDefault>
    <InputLabelDefault label="비밀번호">
      <v-text-field
        type="password"
        v-model="password"
        variant="outlined"
        validate-on="blur"
        :rules="[
          v => !!v || '비밀번호를 입력해주세요',
          v => v.length >= 8 || '8글자 이상 입력해주세요',
          v =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
            '영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열이어야 합니다.',
        ]"
      />
    </InputLabelDefault>
    <InputLabelDefault label="비밀번호 확인">
      <v-text-field
        type="password"
        v-model="passwordConfirm"
        variant="outlined"
        :rules="[v => !!v || '비밀번호를 입력해주세요', v => v === password || '비밀번호가 일치하지 않습니다.']"
        validate-on="blur"
      />
    </InputLabelDefault>
    <v-btn type="submit" class="text-none my-4" color="indigo-darken-3" size="x-large" variant="flat" block>
      다음
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePersonalInfoStore } from '@/stores/app'

const router = useRouter()
const personalInfoStore = usePersonalInfoStore()

const form = ref(null)
const email = ref(personalInfoStore.email || '')
const password = ref(personalInfoStore.password || '')
const passwordConfirm = ref(personalInfoStore.password || '')
const onSubmit = () => {
  if (form.value) {
    personalInfoStore.setPersonalInfo(email.value, password.value)
    router.push('/delivery-info')
  }
}
</script>
