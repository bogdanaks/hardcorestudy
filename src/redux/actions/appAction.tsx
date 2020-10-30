import { AppTypes, Alert } from '../types/appTypes'

export const showAlert = ({ id, type, message }: Alert) => {
    return { type: AppTypes.SHOW_ALERT, payload: { id, type, message } }
}
export const hideAlert = (id: string) => {
    return { type: AppTypes.HIDE_ALERT, payload: id }
}
