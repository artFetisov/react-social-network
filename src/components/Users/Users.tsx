import React, { useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator'
import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/usersSelectors'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'

export const Users: React.FC<PropsType> = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        if (parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {

        const query: QueryParamsType = {}

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followThunk = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowThunk = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return (
        <div >
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
                <Paginator
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            <div>
                {users.map(u => <User
                    userData={u}
                    key={u.id}
                    followingInProgress={followingInProgress}
                    follow={followThunk}
                    unfollow={unfollowThunk}
                />)}
            </div>
        </div >
    );

}

type PropsType = {}
type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}
