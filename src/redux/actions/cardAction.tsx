import { CardTypes, CardThunk } from '../types/cardTypes'
import app from '../../utils/base'
import { v4 as uuidv4 } from 'uuid'

import { showAlert, hideAlert, showLoader, hideLoader } from './appAction'

export const fetchCards = (deckId: string): CardThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const cards = await app
                .firestore()
                .collection(`users/${creatorId}/decks/${deckId}/cards`)
                .orderBy('date', 'desc')
                .get()

            const resCards = cards.docs.map((card) => {
                return {
                    ...card.data(),
                    id: card.id,
                }
            })
            dispatch({ type: CardTypes.FETCH_CARDS, payload: resCards })
            dispatch(hideLoader())
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

export const addCard = (deckId: string, question: string, answer: string): CardThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const newCard = {
                question,
                answer,
                date: new Date().valueOf(),
            }
            const card = await app
                .firestore()
                .collection(`users/${creatorId}/decks/${deckId}/cards`)
                .add(newCard)
            dispatch({
                type: CardTypes.ADD_CARD,
                payload: { id: card.id, ...newCard },
            })
            dispatch(hideLoader())
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

export const delCard = (deckId: string, cardId: string): CardThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            await app.firestore().doc(`users/${creatorId}/decks/${deckId}/cards/${cardId}`).delete()
            dispatch({
                type: CardTypes.DELETE_CARD,
                payload: cardId,
            })
            dispatch(hideLoader())
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

export const editCard = (
    deckId: string,
    cardId: string,
    question: string,
    answer: string,
): CardThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const card = await app
                .firestore()
                .doc(`users/${creatorId}/decks/${deckId}/cards/${cardId}`)
            await card.update({
                question,
                answer,
            })
            dispatch({
                type: CardTypes.EDIT_CARD,
                payload: { id: cardId, question, answer },
            })
            dispatch(hideLoader())
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
