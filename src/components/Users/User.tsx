import React from 'react';
import styles from './Users.module.css'
import image from '../../assets/photo.png'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

export const User: React.FC<PropsType> = ({ userData, followingInProgress, follow, unfollow }) => {
    let user = userData;
    return (
        <div >
            <span >
                <div >
                    <NavLink to={'/Profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small
                            : image} className={styles.img} alt={'avatar'} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                </span>
            </span>
        </div >
    );

}

type PropsType = {
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    userData: UserType
}