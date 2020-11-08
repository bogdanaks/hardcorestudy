import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
import { Confirm } from '../Confirm/Confirm'

import { Card as CardType } from '../../redux/types/cardTypes'
import { delCard } from '../../redux/actions/cardAction'
import { delDeck } from '../../redux/actions/deckAction'
import { Deck } from '../../redux/types/deckTypes'
import { useConfirm } from '../../utils/hooks/useConfirm/useConfirm'
import { ModalDeck } from '../Modal/ModalDeck'

interface CardsProps {
    deckId: string
    cards: CardType[]
    activeDeck: Deck
    theme: 'dark' | 'light'
}

export const Cards: React.FC<CardsProps> = ({ cards, deckId, activeDeck, theme }) => {
    const [isSelectedCard, setIsSelectedCard] = React.useState<number>(0)
    const [showModalCreate, setShowModalCreate] = React.useState<boolean>(false)
    const [showModalEdit, setShowModalEdit] = React.useState<boolean>(false)
    const [showModalDeckEdit, setShowModalDeckEdit] = React.useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const deleteDeck = () => {
        dispatch(delDeck(deckId, history))
    }
    const deleteCard = (props: { [propName: string]: any } | undefined) => {
        dispatch(delCard(deckId, props!.cardId))
        if (isSelectedCard === 0) {
            return <Redirect to={`/decks/${props!.cardId}`} />
        } else {
            setIsSelectedCard(isSelectedCard - 1)
        }
    }
    const {
        Confirm: ConfirmCardDel,
        show: showCardConfirm,
        hide: hideCardConfirm,
        propsConfirm,
    } = useConfirm({ theme, cardId: cards[isSelectedCard].id })
    const {
        Confirm: ConfirmDeckDel,
        show: showDeckConfirm,
        hide: hideDeckConfirm,
        propsConfirm: propsConfirmDeck,
    } = useConfirm({ theme, deckId })

    return (
        <div className={[styles.wrapper, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{`${activeDeck.title}(${cards.length})`}</h2>
                    <div className={styles.btnsHeader}>
                        <button onClick={() => setShowModalDeckEdit(true)}>
                            <FiEdit2 />
                        </button>
                        <button onClick={showDeckConfirm}>
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
                        <button onClick={() => showCardConfirm()}>
                            Удалить карточку <FiTrash />
                        </button>
                        <button onClick={() => setShowModalEdit(true)}>
                            Изменить карточку <FiEdit />
                        </button>
                        <button onClick={() => setShowModalCreate(true)}>
                            Создать карточку <FiPlusSquare />
                        </button>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <h2>Спиcок всех карточек</h2>
                    <Input color={theme} />
                </div>
                <div className={styles.cardsList}>
                    <ul>
                        {cards.map((card, index) => {
                            return (
                                <li key={card.id}>
                                    <CardMin
                                        card={card}
                                        deckId={deckId}
                                        number={index + 1}
                                        theme={theme}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <ConfirmCardDel>
                <Confirm
                    title="Удаление карточки"
                    desc="Вы уверены, что хотите удалить эту карточку?"
                    hideConfirm={hideCardConfirm}
                    yesConfirm={deleteCard}
                    propsConfirm={propsConfirm}
                    theme={theme}
                />
            </ConfirmCardDel>
            <ConfirmDeckDel>
                <Confirm
                    title="Удаление колоды"
                    desc="Вы уверены, что хотите удалить колоду и все карточки внутри?"
                    hideConfirm={hideDeckConfirm}
                    yesConfirm={deleteDeck}
                    propsConfirm={propsConfirmDeck}
                    theme={theme}
                />
            </ConfirmDeckDel>
            {showModalEdit && (
                <ModalCard
                    type="edit"
                    setShowModal={setShowModalEdit}
                    deckId={deckId}
                    questionValue={cards[isSelectedCard].question}
                    answerValue={cards[isSelectedCard].answer}
                    cardId={cards[isSelectedCard].id}
                    theme={theme}
                />
            )}
            {showModalCreate && (
                <ModalCard
                    type="create"
                    setShowModal={setShowModalCreate}
                    deckId={deckId}
                    theme={theme}
                />
            )}
            {showModalDeckEdit && (
                <ModalDeck
                    type="edit"
                    setShowModal={setShowModalDeckEdit}
                    titleValue={activeDeck.title}
                    descriptionValue={activeDeck.description}
                    colorValue={activeDeck.color}
                    deckId={deckId}
                    theme={theme}
                />
            )}
        </div>
    )
}
