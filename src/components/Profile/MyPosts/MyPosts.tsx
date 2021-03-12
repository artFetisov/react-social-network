import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators';
import { createField } from '../../FormsControls/FormsControls';
import { PostType } from '../../../types/types';

const maxLength20 = maxLengthCreator(20);

const NewPostTextForm: React.FC<InjectedFormProps<NewPostFormValuesType, NewPostFormOwnProps> & NewPostFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostFormValuesTypeKeys>('', 'newPostText', 'New Post', [requiredField, maxLength20], 'textarea', null)}
            </div>
            <div>
                <button>Add New Post</button>
            </div>
        </form>
    )
}

const NewPostTextFormRedux = reduxForm<NewPostFormValuesType, NewPostFormOwnProps>({
    form: 'newPostText'
})(NewPostTextForm);

const MyPosts: React.FC<PropsTypeMyPosts> = React.memo(props => {
    const onAddPost = (values: NewPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    let postsElement = props.posts.map((e, ind) => {
        return <Post key={ind} message={e.message} likesCount={e.likesCount} />
    });
    return (
        <div className={s.myPostsBlock} >
            <h3>My Posts</h3>
            <NewPostTextFormRedux onSubmit={onAddPost} />
            {postsElement}
        </div>
    );
});

export default MyPosts;

type NewPostFormValuesType = { newPostText: string }
type NewPostFormOwnProps = {}
type NewPostFormValuesTypeKeys = Extract<keyof NewPostFormValuesType, string>
type PropsTypeMyPosts = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}