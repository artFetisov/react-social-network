import { actions, profileReducer } from './profileReducer';
import { PostType, ProfileType } from '../types/types';

let state = {
    posts: [
        { id: 0, message: 'You', likesCount: 0 },
        { id: 1, message: 'Goodbye', likesCount: 2 },
        { id: 2, message: 'I am the Best', likesCount: 18 },
        { id: 3, message: 'Rock Star', likesCount: 18 },
        { id: 4, message: 'I am believe you', likesCount: 101 },
        { id: 5, message: 'Believer', likesCount: 39 }
    ] as Array<PostType>,
    userProfile: null as ProfileType | null,
    status: ''
};

test('length of posts should be incremented', () => {

    // 1. start data
    let action = actions.addPost('hi samurai');


    // 2.action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(7);
});

test('message of new post should be correct', () => {

    // 1. start data
    let action = actions.addPost('hi samurai');

    // 2.action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[6].message).toBe('hi samurai')
});

test('after deleting length of messages should be decrement', () => {

    // 1. start data
    let action = actions.deletePost(3);

    // 2.action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5)
});

test('after deleting length should not be decrement if id is incorrect', () => {

    // 1. start data
    let action = actions.deletePost(100);

    // 2.action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(6)
});
