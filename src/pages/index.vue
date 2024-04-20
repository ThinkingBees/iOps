<script setup lang="ts">
const accessToken = sessionStorage.getItem('access_token')

const buttonList = [
  {
    name: 'HRIS',
    logo: '/images/logo/hris-logo.png',
    link: `https://hris.potranscorp.com/login/?access_token=${accessToken}`,
  },
  {
    name: 'BusMIS',
    logo: '/images/logo/busmis-logo.png',
    link: `https://busmis.potranscorp.com/login/?access_token=${accessToken}`,
  },
  {
    name: 'TripMIS',
    logo: '/images/logo/tripmis-logo.png',
    link: `https://tripmis.potranscorp.com/login/?access_token=${accessToken}`,
  },
]
</script>

<template>
  <div class="d-flex align-center h-100">
    <div class="mx-auto">
      <VRow>
        <VCol
          v-for="(item, index) in buttonList"
          :key="index"
          cols="12"
          lg="4"
          md="6"
        >
          <VCard
            :href="item.link"
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
