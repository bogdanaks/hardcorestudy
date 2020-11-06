import React from 'react'
import { Redirect } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch } from 'react-redux'

import { delCard } from '../../redux/actions/cardAction'

import 'react-confirm-alert/src/react-confirm-alert.css'
import styles from './styles.module.scss'

import { FiEdit2, FiTrash } from 'react-icons/fi'
import { Card } from '../../redux/types/cardTypes'

interface CardProps {
    card: Card
    deckId: string
    number: number
}

export const CardMin: React.FC<CardProps> = ({ card, deckId, number }) => {
    const dispatch = useDispatch()
    const deleteCard = (cardId: string) => {
        dispatch(delCard(deckId, cardId))
        if (number === 1) {
            return <Redirect to={`/decks/${cardId}`} />
        }
    }

    const handleConfirmCardShow = () => {
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
                                    deleteCard(card.id)
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
        <>
            <span>{number}</span>
            <div className={styles.cardMin}>
                <span className={styles.questionMin}>{card.question}</span>
                <div className={styles.lineBetwen}></div>
                <span className={styles.answerMin}>{card.answer}</span>
                <button className={styles.editBtn}>
                    <FiEdit2 />
                </button>
                <button onClick={handleConfirmCardShow} className={styles.trashBtn}>
                    <FiTrash />
                </button>
            </div>
        </>
    )
}
