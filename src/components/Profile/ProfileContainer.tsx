import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfileId, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

export class ProfileContainer extends React.Component<PropsType>  {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.myId;
            if (!userId) {
                this.props.history.push('/Login/')
            }
        }
        if (userId) {
            this.props.getUserProfileId(userId);
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile();
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                    userProfile={this.props.userProfile}
                    status={this.props.status}
                    updateStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        myId: state.auth.id
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        // @ts-ignore
        mapStateToProps, { getUserProfileId, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer) as React.ComponentType;

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type PathParamsType = {
    userId: string
}

type MapDispatchPropsType = {
    getUserProfileId: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type OwnPropsType = {
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>




