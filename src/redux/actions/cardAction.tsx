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

export const addCard = (deckId: string): CardThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const card = await app
                .firestore()
                .collection(`users/${creatorId}/decks/${deckId}/cards`)
                .add({ question: 'No question', answer: 'No answer' })
            dispatch({
                type: CardTypes.ADD_CARD,
                payload: { id: card.id, question: 'No question' },
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
