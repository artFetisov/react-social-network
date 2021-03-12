import { UserType } from "../types/types"
import { instance, ResponseType } from "./api"

type GetUsersResponseType = {
    error: null | string
    items: Array<UserType>
    totalCount: number
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>
            (`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data) as Promise<ResponseType>
    },

}
