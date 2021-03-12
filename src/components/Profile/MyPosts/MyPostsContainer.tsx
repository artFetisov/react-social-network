import { actions } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { PostType } from '../../../types/types';
import { AppStateType } from '../../../redux/reduxStore';

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, { addPost: actions.addPost })(MyPosts);

export default MyPostsContainer;

type MapStatePropsType = {
    posts: Array<PostType>
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
type OwnPropsType = {
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType