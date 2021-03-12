import { loginization } from "./authReducer"
import { InferActionsTypes, BaseThunkType } from "./reduxStore"

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;

    }
}

const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(loginization());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
