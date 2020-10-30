import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// enums
export enum UserTypes {
    REG_USER = 'USER/REG_USER',
}

// initialState
export interface UserState {
    user: {
        id: string
        name: string
        email: string
    }
}

//thunk type
export type UserThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    UserState,
    unknown,
    Action<string>
>

// actions
interface RegUserAction {
    type: typeof UserTypes.REG_USER
    payload: UserState
}

export type UserActionTypes = RegUserAction
