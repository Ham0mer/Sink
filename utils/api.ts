import { defu } from 'defu'
import { toast } from 'vue-sonner'

export function useAPI(api: string, options?: object): Promise<unknown> {
  return $fetch(api, defu(options || {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('SinkSiteToken') || ''}`,
    },
  })).catch((error) => {
    if (error?.status === 401) {
      localStorage.removeItem('SinkSiteToken')
      navigateTo('/dashboard/login')
    }
    if (error?.data?.statusMessage) {
      toast(error?.data?.statusMessage)
    }
    return Promise.reject(error)
  })
}
export function pubAPI(api: string): Promise<unknown> {
  return $fetch(api).catch((error) => {
    return Promise.reject(error)
  })
}
