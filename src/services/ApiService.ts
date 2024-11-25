import AxiosBase from './axios/AxiosBase'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
        customHeaders?: Record<string, string>, // Add optional custom headers
    ) {
        param.headers = {
            ...(param.headers || {}), // Preserve existing headers
            ...customHeaders, // Add or overwrite with custom headers
            'Content-Type': 'application/json',
            'X-App-Token': 'your-app-specific-token-ifbc',
        }
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
