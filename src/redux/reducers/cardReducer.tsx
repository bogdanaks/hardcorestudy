import produce, { Draft } from 'immer'
import { CardTypes, CardState, CardActionTypes } from '../types/cardTypes'

const initialState: CardState = {
    cards: [],
}

export const cardReducer = produce((draft: Draft<CardState>, action: CardActionTypes) => {
    switch (action.type) {
        case CardTypes.FETCH_CARDS:
            draft.cards = action.payload
            break
        case CardTypes.ADD_CARD:
            draft.cards.push(action.payload)
            break
        case CardTypes.DELETE_CARD:
            draft.cards = draft.cards.filter((card) => card.id !== action.payload)
            break
    }
}, initialState)
