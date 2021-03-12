import { follow, actions, unfollow } from "./usersReducer"
import { userAPI } from '../api/users-api'
import { ResponseType, ResultCodeEnum } from "../api/api"
jest.mock('../api/users-api')

const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

test('success follow thunk ', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleProgress(false, 1))
})

test('success unfollow thunk ', async () => {
    const thunk = unfollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleProgress(false, 1))
})