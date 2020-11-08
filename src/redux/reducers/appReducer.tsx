import produce, { Draft } from 'immer'
import { AppTypes, AppState } from '../types/appTypes'

const initialState: AppState = {
    alert: [],
    loader: false,
    // @ts-ignore
    theme: localStorage.getItem('theme') || 'light',
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
        case AppTypes.SET_THEME:
            draft.theme = action.payload
            break
    }
}, initialState)
