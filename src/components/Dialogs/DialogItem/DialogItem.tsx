import React from 'react';
import s from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/Dialog/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}{props.id}</NavLink>
        </div>
    );
}

export default DialogItem;

