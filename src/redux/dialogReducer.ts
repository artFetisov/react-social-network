import { DialogType, MessageType } from "../types/types";
import { InferActionsTypes } from "./reduxStore";

let initialState = {
    dialogs: [
        { id: 0, name: "Artemonnnnnnn" },
        { id: 1, name: "Irina" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Roma" },
        { id: 4, name: "Nika" },
        { id: 5, name: "Dima" }
    ] as Array<DialogType>,
    messages: [
        { id: 0, message: 'Hi' },
        { id: 1, message: 'Bye' },
        { id: 2, message: 'Ass' },
        { id: 3, message: 'You' },
        { id: 4, message: 'Im fine' },
        { id: 5, message: 'Ok' }
    ] as Array<MessageType>
}

export const actions = {
    addMessage: (valueMessage: string) => ({ type: 'dialogs/ADD_MESSAGE', valueMessage } as const)
}

export const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'dialogs/ADD_MESSAGE':
            let body = action.valueMessage;
            return {
                ...state,
                messages: [...state.messages, { id: 101, message: body }],
            }

        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState


