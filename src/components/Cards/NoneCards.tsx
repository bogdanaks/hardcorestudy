import React from 'react'
import { useDispatch } from 'react-redux'
import { addCard } from '../../redux/actions/cardAction'

import { Button } from '../Button/Button'

import styles from './styles.module.scss'

export const NoneCards: React.FC<{ deckId: string }> = ({ deckId }) => {
    const dispatch = useDispatch()
    const handleClickCreateDeck = () => {
        dispatch(addCard(deckId))
    }
    return (
        <div className={styles.noneCards}>
            <div className={styles.container}>
                <h2>В этой колоде нет ни одной карты</h2>
                <div onClick={handleClickCreateDeck}>
                    <Button color={'blue'} title={'Создать карту'} />
                </div>
            </div>
        </div>
    )
}
