import { ofetch } from 'ofetch'
import { refreshToken } from '@/composables/useDirectus'

const fetchMe = async () => {
  try {
    return await fetch('https://api.potranscorp.com/users/me', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    })
  }
  catch (e) {
    console.log(e)

    return false
  }
}

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },

  async onResponseError({ response }) {
    if (response.status === 401) {
      const count = 0
      let userData = null
      while (!fetchMe()) {
        refreshToken()
        userData = fetchMe()
        if (count > 3)
          window.location.href = 'https://iops.potranscorp.com'
      }
      console.log(userData)
    }
  },
})
