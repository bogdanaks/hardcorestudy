import { UserTypes, UserThunk } from '../types/userTypes'
import app from '../../utils/base'
import { v4 as uuidv4 } from 'uuid'

import { showAlert, hideAlert, showLoader, hideLoader } from './appAction'

export const regUser = (name: string, email: string, password: string, history: any): UserThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const data = await app.auth().createUserWithEmailAndPassword(email, password)
            await app.auth().signInWithEmailAndPassword(email, password)
            await app.firestore().collection('users').add({
                id: data.user?.uid,
                name,
                email,
                password,
            })
            await app.auth().currentUser?.updateProfile({ displayName: name })
            localStorage.setItem('user', JSON.stringify({ id: data.user?.uid, name, email }))
            dispatch({ type: UserTypes.REG_USER, payload: { id: data.user?.uid, name, email } })
            dispatch(hideLoader())
            history.push('/')
        } catch (error) {
            dispatch(hideLoader())
            const id = uuidv4()
            dispatch(showAlert({ type: 'error', id, message: error.message }))
            setTimeout(() => {
                dispatch(hideAlert(id))
            }, 3000)
        }
    }
}

export const loginUser = (email: string, password: string, history: any): UserThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const data = await app.auth().signInWithEmailAndPassword(email, password)
            localStorage.setItem(
                'user',
                JSON.stringify({ id: data.user?.uid, name: data.user?.displayName, email }),
            )
            dispatch({
                type: UserTypes.LOGIN_USER,
                payload: { id: data.user?.uid, name: data.user?.displayName, email },
            })
            dispatch(hideLoader())
            history.push('/')
        } catch (error) {
            dispatch(hideLoader())
            const id = uuidv4()
            dispatch(showAlert({ type: 'error', id, message: error.message }))
            setTimeout(() => {
                dispatch(hideAlert(id))
            }, 3000)
        }
    }
}

export const exitUser = (history: any): UserThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            await app.auth().signOut()
            localStorage.removeItem('user')
            dispatch({ type: UserTypes.EXIT_USER })
            history.push('/auth')
        } catch (error) {
            dispatch(hideLoader())
            const id = uuidv4()
            dispatch(showAlert({ type: 'error', id, message: error.message }))
            setTimeout(() => {
                dispatch(hideAlert(id))
            }, 3000)
        }
    }
}
