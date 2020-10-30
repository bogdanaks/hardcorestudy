// enums
export enum AppTypes {
    SHOW_ALERT = 'APP/SHOW_ALERT',
    HIDE_ALERT = 'APP/HIDE_ALERT',
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
}
