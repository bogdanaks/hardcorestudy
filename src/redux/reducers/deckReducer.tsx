import produce, { Draft } from 'immer'
import { DeckTypes, DeckState, DeckActionTypes } from '../types/deckTypes'

const initialState: DeckState = {
    decks: [],
    activeDeck: {
        id: '',
        title: '',
        description: '',
        color: '',
        cardsCount: 0,
        date: 0,
    },
}

export const deckReducer = produce((draft: Draft<DeckState>, action: DeckActionTypes) => {
    switch (action.type) {
        case DeckTypes.FETCH_DECK:
            draft.decks = action.payload
            break
        case DeckTypes.SET_ACTIVE_DECK:
            draft.activeDeck = action.payload
            break
        case DeckTypes.ADD_DECK:
            draft.decks.unshift(action.payload)
            break
        case DeckTypes.DELETE_DECK:
            draft.decks = draft.decks.filter((deck) => deck.id !== action.payload)
            break
        case DeckTypes.EDIT_DECK:
            // const indx = draft.decks.findIndex((el) => el.id === action.payload.id)
            // draft.cards[indx].question = action.payload.question
            // draft.cards[indx].answer = action.payload.answer
            draft.activeDeck = {
                ...draft.activeDeck,
                title: action.payload.title,
                description: action.payload.description,
                color: action.payload.color,
            }
            break
    }
}, initialState)
