import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../components/Loader/Loader'
import { NoneDecks } from '../components/Decks/NoneDecks'
import { Decks } from '../components/Decks/Decks'

import { RootState } from '../redux/types/rootTypes'
import { fetchDecks } from '../redux/actions/deckAction'

export const PageDecks: React.FC = () => {
    const loader = useSelector((state: RootState) => state.app.loader)
    const decks = useSelector((state: RootState) => state.decks.decks)
    const theme = useSelector((state: RootState) => state.app.theme)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchDecks())
        // eslint-disable-next-line
    }, [])

    if (loader && decks.length === 0) return <Loader theme={theme} />
    if (decks.length === 0) return <NoneDecks theme={theme} />
    return <Decks decks={decks} theme={theme} />
}
