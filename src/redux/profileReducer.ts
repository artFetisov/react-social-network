import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";
import { profileAPI } from "../api/profile-api";

let initialState = {
    posts: [
        { id: 0, message: 'You', likesCount: 0 },
        { id: 1, message: 'Goodbye', likesCount: 2 },
        { id: 2, message: 'I am the Best', likesCount: 18 },
        { id: 3, message: 'Rock Star', likesCount: 18 },
        { id: 4, message: 'I am believe you', likesCount: 101 },
        { id: 5, message: 'Believer', likesCount: 39 }
    ] as Array<PostType>,
    userProfile: null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST-BACK':
            let post = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, post]
            }

        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.userProfile
            }

        case 'profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.userId)
            }

        case 'profile/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                userProfile: { ...state.userProfile, photos: action.photos } as ProfileType
            }

        default:
            return state;
    }

}

export const actions = {
    addPost: (newPostText: string) => ({ type: 'profile/ADD-POST-BACK', newPostText } as const),
    deletePost: (userId: number) => ({ type: 'profile/DELETE_POST', userId } as const),
    setUserProfile: (userProfile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', userProfile } as const),
    setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfileId = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
        dispatch(getUserProfileId(userId));
    } else {
        dispatch(stopSubmit('profile', { _error: response.messages[0] }))
        return Promise.reject(response.messages[0])
    }
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>