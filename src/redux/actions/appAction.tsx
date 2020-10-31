import { AppTypes, Alert } from '../types/appTypes'

// Alert actions
export const showAlert = ({ id, type, message }: Alert) => {
    return { type: AppTypes.SHOW_ALERT, payload: { id, type, message } }
}
export const hideAlert = (id: string) => {
    return { type: AppTypes.HIDE_ALERT, payload: id }
}

// Loader actions
export const showLoader = () => {
    return { type: AppTypes.SHOW_LOADER }
}
export const hideLoader = () => {
    return { type: AppTypes.HIDE_LOADER }
}
