import { UserType } from './../types/types';
import { ResultCodeEnum, ResponseType } from "../api/api";
import { updateObjectInArray } from "../utils/objectHelpers";
import { Dispatch } from 'redux';
import { InferActionsTypes, BaseThunkType } from './reduxStore';
import { userAPI } from '../api/users-api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,//Array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }

        case 'SET_USERS':
            return { ...state, users: action.user }

        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }

        case 'SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.totalUsersCount }

        case 'SET_TOGGLE_PRELOADER':
            return { ...state, isFetching: action.isFetching }

        case 'SET_FILTER':
            return { ...state, filter: action.payload }

        case 'TOGGLE_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.verity
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (user: Array<UserType>) => ({ type: 'SET_USERS', user } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    setTogglePreloader: (isFetching: boolean) => ({ type: 'SET_TOGGLE_PRELOADER', isFetching } as const),
    toggleProgress: (verity: boolean, userId: number) => ({ type: 'TOGGLE_IN_PROGRESS', verity, userId } as const)
}




export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.setTogglePreloader(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))
    let response = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.setTogglePreloader(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
    apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), actions.followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), actions.unfollowSuccess);
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
