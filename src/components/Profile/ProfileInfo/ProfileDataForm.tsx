import React from 'react';
import { createField } from '../../FormsControls/FormsControls';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { ProfileType } from '../../../types/types';

type ProfileFormOwnProps = {
    userProfile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileFormOwnProps> & ProfileFormOwnProps>
    = ({ userProfile, handleSubmit, error }) => {
        return (
            <form onSubmit={handleSubmit}>
                <button>save</button>
                {error && <div>{error}</div>}
                <div>
                    <b>My name </b>: {createField<ProfileFormValuesTypeKeys>('text', 'fullName', 'Full Name', null, 'input', null)}
                </div>
                <div>
                    <b>Looking for a job </b>: {createField<ProfileFormValuesTypeKeys>('checkbox', 'lookingForAJob', '', null, 'input', null)}
                </div>
                <div>
                    <b>My professionals skills</b> : {createField<ProfileFormValuesTypeKeys>(null, 'lookingForAJobDescription', 'My professionals skills', null, 'textarea', null)}
                </div>
                <div>
                    <b>About me </b>: {createField<ProfileFormValuesTypeKeys>(null, 'aboutMe', 'About me', null, 'textarea', null)}
                </div>
                <div>
                    {Object.keys(userProfile.contacts)
                        .map(key => {
                            return <MySocialNetworksData key={key} keyProp={key} />
                        })}
                </div>
            </form >
        );
    }

type ProfileFormValuesTypeKeys = Extract<keyof ProfileType, string>

type SocialNetworkData = {
    keyProp: string
}

const MySocialNetworksData: React.FC<SocialNetworkData> = ({ keyProp }) => {
    // @ts-ignore
    return <><b>{keyProp}</b>: { createField<ProfileFormValuesTypeKeys>('text', 'contacts.' + keyProp, keyProp, null, 'input', null)}</>
}

export const ProfileDataReduxForm = reduxForm<ProfileType, ProfileFormOwnProps>({
    form: 'profile'
})(ProfileDataForm);

export default ProfileDataForm;