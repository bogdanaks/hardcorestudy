import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// enums
export enum DeckTypes {
    FETCH_DECK = 'DECK/FETCH_DECK',
    ADD_DECK = 'DECK/ADD_DECK',
    DELETE_DECK = 'DECK/DELETE_DECK',
}

// initialState
export type Deck = {
    id: string
    title: string
    description: string
    date: number
    cardsCount: number
}
export interface DeckState {
    decks: Deck[]
}

//thunk type
export type DeckThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    DeckState,
    unknown,
    Action<string>
>

// actions
interface FetchDeckAction {
    type: typeof DeckTypes.FETCH_DECK
    payload: Deck[]
}
interface AddDeckAction {
    type: typeof DeckTypes.ADD_DECK
    payload: Deck
}
interface DelDeckAction {
    type: typeof DeckTypes.DELETE_DECK
    payload: string
}

export type DeckActionTypes = FetchDeckAction | AddDeckAction | DelDeckAction
