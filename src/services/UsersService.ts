import { User } from '@/@types/auth'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function apiGetAllUsers() {
    const response = await ApiService.fetchDataWithAxios<User>({
        url: endpointConfig.getAllUsers,
        method: 'get',
    })

    return response
}


