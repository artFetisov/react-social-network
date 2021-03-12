import { instance, ResultCodeEnum, ResultCodeForCaptcha } from "./api"
import { ResponseType } from './api'

type AuthResponseDataType = {
    id: number
    login: string
    email: string
}

type LoginResponseType = {
    userId: number
}

export const authAPI = {
    authLogin() {
        return instance.get<ResponseType<AuthResponseDataType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)

    }
}

