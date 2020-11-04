import { UserState } from './userTypes'
import { AppState } from './appTypes'
import { DeckState } from './deckTypes'
import { CardState } from './cardTypes'

// initialState
export interface RootState {
    app: AppState
    user: UserState
    decks: DeckState
    cards: CardState
}
