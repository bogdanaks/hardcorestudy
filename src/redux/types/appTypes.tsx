// enums
export enum AppTypes {
    SHOW_ALERT = 'APP/SHOW_ALERT',
    HIDE_ALERT = 'APP/HIDE_ALERT',

    SHOW_LOADER = 'APP/SHOW_LOADER',
    HIDE_LOADER = 'APP/HIDE_LOADER',

    SET_THEME = 'APP/SET_THEME',
}

//types
export interface Alert {
    id: string
    type: 'success' | 'error' | 'info'
    message: string
}

// initialState
export interface AppState {
    alert: Alert[]
    loader: boolean
    theme: 'light' | 'dark'
}
