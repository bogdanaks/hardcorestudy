import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { appReducer } from './appReducer'
import { deckReducer } from './deckReducer'
import { cardReducer } from './cardReducer'

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    decks: deckReducer,
    cards: cardReducer,
})
