<script setup lang="ts">
import { client } from '@/composables/useDirectus';
import avatar1 from '@images/avatars/avatar-1.png';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const router = useRouter()

onMounted(() => {
  if (!sessionStorage.getItem('usersInfo'))
    router.push('/login')
})

const user = JSON.parse(sessionStorage.getItem('usersInfo'))

const accessToken = sessionStorage.getItem('access_token')

const logout = async () => {
  try {
    const response = await client.logout()

    console.log(response)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      size="38"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="15px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <h6 class="text-sm font-weight-medium">
              {{ `${user.first_name} ${user.last_name}` }}
            </h6>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VDivider/>
            <VListItem :href="`https://admin.potranscorp.com?access_token=${accessToken}`">
              <template #prepend>
                <VIcon
                  icon="ri-user-line"
                  size="22"
                />
              </template>

              <VListItemTitle>Admin</VListItemTitle>
            </VListItem>
            <VDivider/>
            <VListItem>
              <VBtn
                block
                color="error"
                append-icon="ri-logout-box-r-line"
                @click="logout"
              >
                Logout
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
