import { ResultCodeEnum, ResultCodeForCaptcha } from './../api/api';
import { stopSubmit } from "redux-form";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";
import { authAPI } from '../api/auth-api';
import { securityApi } from '../api/security-api';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
        case 'auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;

    }
}

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: { id, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({ type: 'auth/SET_USER_DATA', payload: { captchaUrl } } as const)
}

export const loginization = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authLogin();
    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = response.data
        dispatch(actions.setUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(loginization())
    } else {
        if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages : 'Some Error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl()
    let captchaUrl = response.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>