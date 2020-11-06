import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import styles from './styles.module.scss'
import {
    FiLayers,
    FiPlay,
    FiFileText,
    FiEdit,
    FiPlusSquare,
    FiTrash,
    FiEdit2,
} from 'react-icons/fi'

import { Input } from '../Input/Input'
import { Card } from './Card'
import { CardMin } from './CardMin'
import { ModalCard } from '../Modal/ModalCard'

import { Card as CardType } from '../../redux/types/cardTypes'
import { delCard } from '../../redux/actions/cardAction'
import { delDeck } from '../../redux/actions/deckAction'
import { Deck } from '../../redux/types/deckTypes'

interface CardsProps {
    deckId: string
    cards: CardType[]
    activeDeck: Deck
}

export const Cards: React.FC<CardsProps> = ({ cards, deckId, activeDeck }) => {
    const [isSelectedCard, setIsSelectedCard] = React.useState<number>(0)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const dispatch = useDispatch()

    const handleNewCard = () => {
        setShowModal(true)
    }
    const deleteDeck = () => {
        dispatch(delDeck(deckId))
    }
    const deleteCard = (cardId: string) => {
        dispatch(delCard(deckId, cardId))
        if (isSelectedCard === 0) {
            return <Redirect to={`/decks/${cardId}`} />
        } else {
            setIsSelectedCard(isSelectedCard - 1)
        }
    }

    const handleConfirmDeckShow = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.confirmBlock}>
                        <h2>Удаление колоды</h2>
                        <p>Вы уверены, что хотите удалить колоду и все карточки внутри?</p>
                        <div className={styles.btnsConfirm}>
                            <button className={styles.btnCancel} onClick={onClose}>
                                Нет
                            </button>
                            <button
                                className={styles.btnDel}
                                onClick={() => {
                                    deleteDeck()
                                    onClose()
                                }}>
                                Да, удалить
                            </button>
                        </div>
                    </div>
                )
            },
        })
    }
    const handleConfirmCardShow = (cardId: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.confirmBlock}>
                        <h2>Удаление карточки</h2>
                        <p>Вы уверены, что хотите удалить эту карточку?</p>
                        <div className={styles.btnsConfirm}>
                            <button className={styles.btnCancel} onClick={onClose}>
                                Нет
                            </button>
                            <button
                                className={styles.btnDel}
                                onClick={() => {
                                    deleteCard(cardId)
                                    onClose()
                                }}>
                                Да, удалить
                            </button>
                        </div>
                    </div>
                )
            },
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{`${activeDeck.title}(${cards.length})`}</h2>
                    <div className={styles.btnsHeader}>
                        <button>
                            <FiEdit2 />
                        </button>
                        <button onClick={handleConfirmDeckShow}>
                            <FiTrash />
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
                        <button onClick={() => handleConfirmCardShow(cards[isSelectedCard].id)}>
                            Удалить карточку <FiTrash />
                        </button>
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
                                    <CardMin card={card} deckId={deckId} number={index + 1} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {showModal && <ModalCard setShowModal={setShowModal} deckId={deckId} />}
        </div>
    )
}
