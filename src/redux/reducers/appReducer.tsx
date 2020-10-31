import produce, { Draft } from 'immer'
import { AppTypes, AppState } from '../types/appTypes'

const initialState: AppState = {
    alert: [],
    loader: false,
}

export const appReducer = produce((draft: Draft<AppState>, action) => {
    switch (action.type) {
        case AppTypes.SHOW_ALERT:
            draft.alert.push(action.payload)
            break
        case AppTypes.HIDE_ALERT:
            draft.alert = draft.alert.filter((al) => al.id !== action.payload)
            break
        case AppTypes.SHOW_LOADER:
            draft.loader = true
            break
        case AppTypes.HIDE_LOADER:
            draft.loader = false
            break
    }
}, initialState)
