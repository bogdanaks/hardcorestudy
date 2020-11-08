import { DeckTypes, DeckThunk } from '../types/deckTypes'
import app from '../../utils/base'
import { v4 as uuidv4 } from 'uuid'

import { showAlert, hideAlert, showLoader, hideLoader } from './appAction'

export const fetchDecks = (): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)

            const decks = await app
                .firestore()
                .collection(`users/${creatorId}/decks`)
                .orderBy('date', 'desc')
                .get()

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

export const setActiveDeck = (deckId: string): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const deck = await app.firestore().doc(`users/${creatorId}/decks/${deckId}`).get()
            dispatch({
                type: DeckTypes.SET_ACTIVE_DECK,
                payload: { id: deck.id, ...deck.data() },
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

export const addDeck = (title: string, color: string, description?: string): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const desc = description !== undefined ? description : ''
            const newDeck = {
                title,
                description: desc,
                color,
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

export const delDeck = (deckId: string, history: any): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const cards = await app
                .firestore()
                .collection(`users/${creatorId}/decks/${deckId}/cards`)
                .get()

            await cards.docs.map(async (card) => {
                await card.ref.delete()
            })

            await app.firestore().doc(`users/${creatorId}/decks/${deckId}`).delete()

            dispatch({
                type: DeckTypes.DELETE_DECK,
                payload: deckId,
            })
            dispatch(hideLoader())
            history.push('/decks')
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

export const editDeck = (
    deckId: string,
    title: string,
    description: string,
    color: string,
): DeckThunk => {
    return async (dispatch) => {
        try {
            dispatch(showLoader())
            const { id: creatorId } = await JSON.parse(localStorage.getItem('user')!)
            const deck = await app.firestore().doc(`users/${creatorId}/decks/${deckId}`)
            await deck.update({
                title,
                description,
                color,
            })
            dispatch({
                type: DeckTypes.EDIT_DECK,
                payload: { id: deckId, title, description, color },
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
