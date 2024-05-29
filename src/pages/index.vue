<script setup lang="ts">
const accessToken = sessionStorage.getItem('access_token')
const refreshToken = sessionStorage.getItem('refresh_token')

const buttonList = [
  {
    name: 'HRIS',
    logo: '/images/logo/hris-logo.png',
    link: `https://hris.potranscorp.com/login/?access_token=${accessToken}&refresh_token=${refreshToken}`,
  },
  {
    name: 'BusMIS',
    logo: '/images/logo/busmis-logo.png',
    link: `https://busmis.potranscorp.com/login/?access_token=${accessToken}&refresh_token=${refreshToken}`,
  },
  {
    name: 'TripMIS',
    logo: '/images/logo/tripmis-logo.png',
    link: `https://tripmis.potranscorp.com/login/?access_token=${accessToken}&refresh_token=${refreshToken}`,
  },
]
</script>

<template>
  <div class="d-flex align-center h-100 flex-column">
    <div class="my-auto">
      <VImg
        src="/images/logo-2.png"
        height="200"
        class="mx-auto"
      />
      <VRow>
        <VCol
          v-for="(item, index) in buttonList"
          :key="index"
          cols="12"
          md="4"
        >
          <VCard
            class="mx-auto"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            style=" max-inline-size: 350px;min-block-size: 300px; min-inline-size: 300px;"
          >
            <VCardText>
              <VImg :src="item.logo" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </div>
</template>
