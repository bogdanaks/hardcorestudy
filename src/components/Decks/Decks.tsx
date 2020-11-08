import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

import { Deck } from './Deck'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { ModalDeck } from '../Modal/ModalDeck'

import { Deck as DeckType } from '../../redux/types/deckTypes'

interface DecksProps {
    deckId?: string | undefined
    decks: DeckType[]
}

export const Decks: React.FC<DecksProps> = ({ deckId, decks }) => {
    const [showModal, setShowModal] = React.useState<boolean>(false)

    const handleClickCreateDeck = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.container}>
            <div className={styles.decks}>
                <div className={styles.header}>
                    <Input color={'light'} />
                    <div className={styles.btn} onClick={handleClickCreateDeck}>
                        <Button color={'blue'} title={'Новая колода'} />
                    </div>
                </div>
                <div className={styles.decksContainer}>
                    {decks.map((deck) => {
                        return (
                            <Link key={deck.id} to={`/decks/${deck.id}`}>
                                <Deck
                                    title={deck.title}
                                    description={deck.description}
                                    color={deck.color}
                                    date={deck.date}
                                    cardsCount={deck.cardsCount}
                                    active={deckId === deck.id ? true : false}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
            {showModal && <ModalDeck type="create" setShowModal={setShowModal} />}
        </div>
    )
}
