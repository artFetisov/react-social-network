import React, { ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/photo.png';
import { useState } from 'react';
import { ProfileDataReduxForm } from './ProfileDataForm';
import { ProfileType, ContactsType } from '../../../types/types';

type PropsType = {
    userProfile: ProfileType | null
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({ userProfile, isOwner, saveProfile, savePhoto, status, updateStatus, ...props }) => {

    const [editMode, setEditMode] = useState(false);

    if (!userProfile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length)
            savePhoto(e.target.files[0]);
    }

    const onSubmitData = (dataForm: ProfileType) => {
        saveProfile(dataForm).then(() => { setEditMode(false) })
    }

    return (
        <div>
            <div className={s.infoBlock}>
                <img src={userProfile.photos.large || userPhoto} alt={userProfile.fullName} />
                {isOwner && <input type="file" onChange={onMainPhotoSelected}></input>}
                {editMode
                    ? <ProfileDataReduxForm initialValues={userProfile} userProfile={userProfile} onSubmit={onSubmitData} />
                    : <ProfileData userProfile={userProfile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}

            </div>
            <div className={s.status}>
                <ProfileStatusWithHooks status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div >
    );
}

type ProfileDataPropsType = {
    userProfile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ userProfile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}
            <div>
                <b>My name </b>: {userProfile.fullName}
            </div>
            <div>
                <b>Looking for a job </b>: {userProfile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {userProfile.lookingForAJob &&
                <div>
                    <b>My professionals skills</b> : {userProfile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me </b>: {userProfile.aboutMe}
            </div>
            <div>
                {Object.keys(userProfile.contacts)
                    .map((key) => {
                        return <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key as keyof ContactsType]} />
                    })}
            </div>
        </div>
    );
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b> : {contactValue}</div>
}

export default ProfileInfo;