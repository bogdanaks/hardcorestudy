import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// enums
export enum UserTypes {
    REG_USER = 'USER/REG_USER',
    LOGIN_USER = 'USER/LOGIN_USER',
    EXIT_USER = 'USER/EXIT_USER',
}

// initialState
type User = {
    id: string
    name: string
    email: string
}
export interface UserState {
    user: User
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
    payload: User
}
interface LoginUserAction {
    type: typeof UserTypes.LOGIN_USER
    payload: User
}
interface ExitUserAction {
    type: typeof UserTypes.EXIT_USER
}

export type UserActionTypes = RegUserAction | LoginUserAction | ExitUserAction
