import produce, { Draft } from 'immer'
import { UserTypes, UserState } from '../types/userTypes'

const initialState: UserState = {
    user: {
        id: '',
        name: '',
        email: '',
    },
}

export const userReducer = produce((draft: Draft<UserState>, action) => {
    switch (action.type) {
        case UserTypes.REG_USER:
            draft.user = action.payload
            break
    }
}, initialState)
