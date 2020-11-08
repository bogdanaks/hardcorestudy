import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Confirm as ConfirmBlock } from '../Confirm/Confirm'
import { useConfirm } from '../../utils/hooks/useConfirm/useConfirm'

import { delCard } from '../../redux/actions/cardAction'

import styles from './styles.module.scss'

import { FiEdit2, FiTrash } from 'react-icons/fi'
import { Card } from '../../redux/types/cardTypes'
import { ModalCard } from '../Modal/ModalCard'

interface CardProps {
    card: Card
    deckId: string
    number: number
    theme: 'dark' | 'light'
}

export const CardMin: React.FC<CardProps> = ({ card, deckId, number, theme }) => {
    const dispatch = useDispatch()
    const [showModalEdit, setShowModalEdit] = React.useState<boolean>(false)
    const {
        Confirm: ConfirmCardDel,
        show: showCardConfirm,
        hide: hideCardConfirm,
        propsConfirm,
    } = useConfirm({ theme, cardId: card.id })

    const deleteCard = (cardId: string) => {
        dispatch(delCard(deckId, cardId))
        if (number === 1) {
            return <Redirect to={`/decks/${cardId}`} />
        }
    }
    return (
        <>
            <span>{number}</span>
            <div className={styles.cardMin}>
                <span className={styles.questionMin}>{card.question}</span>
                <div className={styles.lineBetwen}></div>
                <span className={styles.answerMin}>{card.answer}</span>
                <button onClick={() => setShowModalEdit(true)} className={styles.editBtn}>
                    <FiEdit2 />
                </button>
                <button onClick={showCardConfirm} className={styles.trashBtn}>
                    <FiTrash />
                </button>
            </div>
            <ConfirmCardDel>
                <ConfirmBlock
                    title="Удаление карточки"
                    desc="Вы уверены, что хотите удалить эту карточку?"
                    hideConfirm={hideCardConfirm}
                    yesConfirm={() => deleteCard(card.id)}
                    propsConfirm={propsConfirm}
                    theme={theme}
                />
            </ConfirmCardDel>
            {showModalEdit && (
                <ModalCard
                    type="edit"
                    setShowModal={setShowModalEdit}
                    deckId={deckId}
                    questionValue={card.question}
                    answerValue={card.answer}
                    cardId={card.id}
                    theme={theme}
                />
            )}
        </>
    )
}
