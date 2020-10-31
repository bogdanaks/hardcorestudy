import produce, { Draft } from 'immer'
import { UserTypes, UserState } from '../types/userTypes'

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user')!) || {
        id: '',
        email: '',
        name: '',
    },
}

export const userReducer = produce((draft: Draft<UserState>, action) => {
    switch (action.type) {
        case UserTypes.REG_USER:
            draft.user = action.payload
            break
        case UserTypes.LOGIN_USER:
            draft.user = action.payload
            break
        case UserTypes.EXIT_USER:
            draft.user = {
                id: '',
                email: '',
                name: '',
            }
    }
}, initialState)
