import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={s.navbar}>
            <div>
                <img className={s.img} alt={'картинка'} src="https://sun1-30.userapi.com/impf/c857336/v857336749/46645/xjFV_iRvESs.jpg?size=200x0&quality=90&crop=261,20,704,704&sign=d53544dcd3c92e090c9d6606c46a9b4f&ava=1"></img>
            </div>
            <div className={s.item}>
                <NavLink to="/Profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Dialogs" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Photos" activeClassName={s.active}>Photos</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Users" activeClassName={s.active}>Users</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;