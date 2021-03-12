import React from 'react';
import s from './Post.module.css';

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <div>
                <img src="https://sun9-32.userapi.com/c10096/u70174017/-6/z_ff229a81.jpg" alt={'Post'} />
            </div>
            <div>{props.message}</div>
            <div>{props.likesCount}</div>
        </div>
    );
}

export default Post;

type PropsType = {
    message: string
    likesCount: number
}