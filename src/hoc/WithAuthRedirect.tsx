import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/reduxStore';

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function WithAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapDispatchPropsType & MapStatePropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to='/Login' />
        return <Component {...restProps as WCP} />

    }

    let ConnectedAuthRedirectComponet = connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponet;
}


type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
}
