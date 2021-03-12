import React from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import Preloader from '../Preloader/Preloader'
import { getIsFollowing } from '../../redux/usersSelectors'

type UserPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFollowing)

    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching
                ? <Preloader />
                : null
            }
            <Users />
        </>
    )
}


