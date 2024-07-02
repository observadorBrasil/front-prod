import Axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { ApiRequestWrapperResponse } from './interfaces/api-request-wrapper-response.interface'
import { ApiRequestWrapperArgs } from './interfaces/api-request-wrapper.interface'
import { getCookie } from 'cookies-next'
import { store } from '../store'
import dotenv from 'dotenv'

dotenv.config()

console.log('ENV', process.env.NODE_ENV)

export class ApiRepository {
  apiInstance!: AxiosInstance

  constructor(baseUrl: string) {
    this.createApiInstance(baseUrl)
  }

  private createApiInstance(baseUrl: string) {
    const baseApiUrl: string | undefined =
      //   process.env.NEXT_PUBLIC_MONITORING_DEVELOPMENT_API_URL
    process.env.NEXT_PUBLIC_MONITORING_API_URL
    // 'https://observador-api-new.azurewebsites.net/api'

    const url: string = baseApiUrl
      ? `${baseApiUrl}${baseUrl}`
      : // process.env.NODE_ENV === "development" ?
        // `http://localhost:5001/api${baseUrl}`
        `https://monitoring-proposition-api.azurewebsites.net/api${baseUrl}`
      

    const api = Axios.create({
      baseURL: url,
    })

    this.apiInstance = api
  }

  public async apiRequestWrapper<T>(
    args: ApiRequestWrapperArgs,
  ): Promise<ApiRequestWrapperResponse<T>> {
    try {
      const accessToken = () => {
        if (store) {
          const user = store.getState().user.user
          if (user) {
            return user.accessToken
          }
          return ''
        }
        return getCookie('observatorio_token')
      }

      const config = {
        method: args.method,
        url: args.url,
        data: args.data,
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken()}`,
              ...(args.headers || {}),
            }
          : { ...(args.headers || {}) },
      }

      const res = await this.apiInstance.request<T>(config)
      return { success: true, data: res.data }
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userMessage = (e as any)?.response?.data?.userMessage as string
        toast.error(userMessage || 'Ocorreu um erro.', {})
        return { success: false, error: e?.response?.data }
      }
      return { success: false, error: 'Error' }
    }
  }
}
