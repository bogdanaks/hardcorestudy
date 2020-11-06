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

interface CardsProps {
    deckId: string
    cards: CardType[]
    activeDeck: Deck
}

export const Cards: React.FC<CardsProps> = ({ cards, deckId, activeDeck }) => {
    const [isSelectedCard, setIsSelectedCard] = React.useState<number>(0)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleNewCard = () => {
        setShowModal(true)
    }
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
    } = useConfirm({
        cardId: cards[isSelectedCard].id,
    })
    const {
        Confirm: ConfirmDeckDel,
        show: showDeckConfirm,
        hide: hideDeckConfirm,
        propsConfirm: propsConfirmDeck,
    } = useConfirm({ deckId })

    return (
        <div className={styles.wrapper}>
            <ConfirmCardDel>
                <Confirm
                    title="Удаление карточки"
                    desc="Вы уверены, что хотите удалить эту карточку?"
                    hideConfirm={hideCardConfirm}
                    yesConfirm={deleteCard}
                    propsConfirm={propsConfirm}
                />
            </ConfirmCardDel>
            <ConfirmDeckDel>
                <Confirm
                    title="Удаление колоды"
                    desc="Вы уверены, что хотите удалить колоду и все карточки внутри?"
                    hideConfirm={hideDeckConfirm}
                    yesConfirm={deleteDeck}
                    propsConfirm={propsConfirmDeck}
                />
            </ConfirmDeckDel>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{`${activeDeck.title}(${cards.length})`}</h2>
                    <div className={styles.btnsHeader}>
                        <button>
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
