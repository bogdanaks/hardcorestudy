import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// enums
export enum CardTypes {
    FETCH_CARDS = 'CARD/FETCH_CARDS',
    ADD_CARD = 'CARD/ADD_CARD',
    DELETE_CARD = 'CARD/DELETE_CARD',
}

// initialState
export type Card = {
    id: string
    deckId: string
    creatorId: string
    question: string
    answer: string
}
export interface CardState {
    cards: Card[]
}

//thunk type
export type CardThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    CardState,
    unknown,
    Action<string>
>

// actions
interface FetchCardAction {
    type: typeof CardTypes.FETCH_CARDS
    payload: Card[]
}
interface AddCardAction {
    type: typeof CardTypes.ADD_CARD
    payload: Card
}
interface DelCardAction {
    type: typeof CardTypes.DELETE_CARD
    payload: string
}

export type CardActionTypes = FetchCardAction | AddCardAction | DelCardAction
