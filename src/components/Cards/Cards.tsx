import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './styles.module.scss'
import { FiLayers, FiPlay, FiFileText, FiEdit, FiPlusSquare } from 'react-icons/fi'
import { GoPencil } from 'react-icons/go'
import { GoTrashcan } from 'react-icons/go'

import { addCard } from '../../redux/actions/cardAction'

import { Input } from '../Input/Input'
import { Card } from './Card'
import { Card as CardType } from '../../redux/types/cardTypes'
import { CardMin } from './CardMin'

interface CardsProps {
    deckId: string
    cards: CardType[]
}

export const Cards: React.FC<CardsProps> = ({ cards, deckId }) => {
    const [isSelectedCard, setIsSelectedCard] = React.useState<number>(0)
    const dispatch = useDispatch()
    const handleNewCard = () => {
        dispatch(addCard(deckId))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{`English(${cards.length})`}</h2>
                    <div className={styles.btnsHeader}>
                        <button>
                            <GoPencil />
                        </button>
                        <button>
                            <GoTrashcan />
                        </button>
                    </div>
                </div>
                <div className={styles.cardBlock}>
                    <Card
                        question={cards[isSelectedCard].question}
                        answer={cards[isSelectedCard].answer}
                        allCount={cards.length}
                        curCard={isSelectedCard}
                        setCurCard={setIsSelectedCard}
                    />
                    <div className={styles.cardMode}>
                        <button className={styles.active}>
                            Все карточки <FiLayers />
                        </button>
                        <button disabled>
                            Начать обучение <FiPlay />
                        </button>
                        <button disabled>
                            Тест <FiFileText />
                        </button>
                        <div className={styles.line}></div>
                        <button>
                            Изменить карточку <FiEdit />
                        </button>
                        <button onClick={handleNewCard}>
                            Создать карточку <FiPlusSquare />
                        </button>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <h2>Спиcок всех карточек</h2>
                    <Input color="light" />
                </div>
                <div className={styles.cardsList}>
                    <ul>
                        {cards.map((card, index) => {
                            return (
                                <li key={card.id}>
                                    <CardMin
                                        question={card.question}
                                        answer={card.answer}
                                        number={index + 1}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
