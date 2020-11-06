import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCards } from '../redux/actions/cardAction'
import { setActiveDeck } from '../redux/actions/deckAction'
import { RootState } from '../redux/types/rootTypes'
import { Cards } from '../components/Cards/Cards'
import { Loader } from '../components/Loader/Loader'
import { NoneCards } from '../components/Cards/NoneCards'

export const PageCards: React.FC = () => {
    const dispatch = useDispatch()
    const loader = useSelector((state: RootState) => state.app.loader)
    const cards = useSelector((state: RootState) => state.cards.cards)
    const activeDeck = useSelector((state: RootState) => state.decks.activeDeck)
    React.useEffect(() => {
        dispatch(setActiveDeck(deckId))
        dispatch(fetchCards(deckId))
        // eslint-disable-next-line
    }, [])
    const { deckId }: { deckId: string } = useParams()

    if (loader && cards.length === 0) return <Loader />
    if (cards.length === 0) return <NoneCards deckId={deckId} />
    return <Cards cards={cards} deckId={deckId} activeDeck={activeDeck} />
}
