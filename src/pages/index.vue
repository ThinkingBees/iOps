<script setup lang="ts">
const buttonList = [
  {
    name: 'HRIS',
    logo: '/images/logo/hris-logo.png',
    link: 'https://hris.potranscorp.com',
  },
  {
    name: 'BusMIS',
    logo: '/images/logo/busmis-logo.png',
    link: 'https://busmis.potranscorp.com',
  },
  {
    name: 'TripMIS',
    logo: '/images/logo/tripmis-logo.png',
    link: 'https://tripmis.potranscorp.com',
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
          md="4"
        >
          <VCard
            :href="item.link"
            style="min-block-size: 300px; min-inline-size: 300px"
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
