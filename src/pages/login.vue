<script setup lang="ts">
import { readMe } from '@directus/sdk'
import AppLoadingIndicator from '@/components/AppLoadingIndicator.vue'
import { client } from '@/composables/useDirectus'
import buslogin from '@images/buslogin.png'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/mask-v2-dark.png'
import authV2MaskLight from '@images/pages/mask-v2-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const router = useRouter()
const loading = ref(false)

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const AppLoadingIndicatorRef = ref()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)

definePage({
  meta: {
    layout: 'blank',
  },
})

const requestLogin = async () => {
  loading.value = true
  AppLoadingIndicatorRef.value.fallbackHandle()
  try {
    const response = await client.login(form.value.email, form.value.password)

    sessionStorage.setItem('access_token', response.access_token)
    sessionStorage.setItem('refresh_token', response.refresh_token)

    const users = await client.request(readMe())

    sessionStorage.setItem('usersInfo', JSON.stringify(users))

    router.push('/')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    AppLoadingIndicatorRef.value.resolveHandle()
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-logo d-flex align-center gap-x-3">
    <VNodeRenderer :nodes="themeConfig.app.logo" />

    <h1 class="auth-title">
      {{ themeConfig.app.title }}
    </h1>
  </div>

  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <VImg
        :src="buslogin"
        alt="tree image"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to {{ themeConfig.app.title }}! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="requestLogin">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  block
                  :loading="loading"
                  @click="requestLogin"
                >
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <AppLoadingIndicator ref="AppLoadingIndicatorRef" />
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
