import { UserState } from './userTypes'
import { AppState } from './appTypes'

// initialState
export interface RootState {
    app: AppState
    user: UserState
}
