import React from 'react';
import s from './Message.module.css';

type PropsType = {
    id: number
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>{props.message}{props.id}</div>
    );
}

export default Message;