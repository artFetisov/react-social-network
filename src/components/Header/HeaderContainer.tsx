import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    isAuth: boolean
    login: null | string
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const HeaderContainer: React.FC<PropsType> = (props) => {
    return (
        <Header {...props} />
    );

}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, { logout })(HeaderContainer);
