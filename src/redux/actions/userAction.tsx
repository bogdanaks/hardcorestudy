import { UserTypes, UserThunk } from '../types/userTypes'
import app from '../../utils/base'
import { v4 as uuidv4 } from 'uuid'

import { showAlert, hideAlert } from './appAction'

export const regUser = (name: string, email: string, password: string): UserThunk => {
    return async (dispatch) => {
        try {
            const data = await app.auth().createUserWithEmailAndPassword(email, password)
            await app.auth().signInWithEmailAndPassword(email, password)
            await app.firestore().collection('users').add({
                id: data.user?.uid,
                name,
                email,
                password,
            })
            dispatch({ type: UserTypes.REG_USER, payload: { id: data.user?.uid, name, email } })
        } catch (error) {
            const id = uuidv4()
            dispatch(showAlert({ type: 'error', id, message: error.message }))
            setTimeout(() => {
                dispatch(hideAlert(id))
            }, 3000)
        }
    }
}
