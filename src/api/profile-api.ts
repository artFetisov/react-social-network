import { instance, ResponseType } from "./api";
import { ProfileType, PhotosType } from "../types/types";

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile: (userId: number | null) => {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus: (status: string) => {
        return instance.put<ResponseType>(`profile/status`, { status: status }).then(response => response.data)
    },
    savePhoto: (photo: any) => {
        const formData = new FormData();
        formData.append('image', photo)
        return instance.put<ResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data)
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put(`profile`, profile).then(response => response.data)
    }
}
