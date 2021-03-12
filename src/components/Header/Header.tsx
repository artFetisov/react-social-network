import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    isAuth: boolean
    logout: () => void
    login: string | null
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={style.header} >
            <div className={style.loginPage}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>LOGOUT</button></div>
                    : <NavLink to='/Login'>LOGIN</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;