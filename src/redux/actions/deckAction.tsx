import { DeckTypes, DeckThunk } from '../types/deckTypes'
import app from '../../utils/base'
import { v4 as uuidv4 } from 'uuid'

import { showAlert, hideAlert, showLoader, hideLoader } from './appAction'

export const fetchDecks = (): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)

            const decks = await app.firestore().collection(`users/${creatorId}/decks`).get()

            const resDecks = await Promise.all(
                decks.docs.map(async (deck) => {
                    const cardsCount = await (
                        await app
                            .firestore()
                            .doc(`users/${creatorId}/decks/${deck.id}`)
                            .collection('cards')
                            .get()
                    ).docs.length
                    return {
                        ...deck.data(),
                        cardsCount,
                        id: deck.id,
                    }
                }),
            )
            dispatch({ type: DeckTypes.FETCH_DECK, payload: resDecks })
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

export const addDeck = (): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const newDeck = {
                title: 'No title',
                description: 'No description',
                color: 'blue',

                date: new Date().valueOf(),
            }
            const deck = await app
                .firestore()
                .doc(`users/${creatorId}`)
                .collection('decks')
                .add(newDeck)
            dispatch({
                type: DeckTypes.ADD_DECK,
                payload: { id: deck.id, cardsCount: 0, ...newDeck },
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
