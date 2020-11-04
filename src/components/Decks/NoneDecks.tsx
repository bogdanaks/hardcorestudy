import React from 'react'
import { useDispatch } from 'react-redux'
import { addDeck } from '../../redux/actions/deckAction'

import { Button } from '../Button/Button'

import styles from './styles.module.scss'

export const NoneDecks: React.FC = () => {
    const dispatch = useDispatch()
    const handleClickCreateDeck = () => {
        dispatch(addDeck())
    }
    return (
        <div className={styles.noneDecks}>
            <div className={styles.container}>
                <h2>Вы еще не создали ни одной колоды.</h2>
                <p>Создайте колоду на любую интересующую вас тему</p>
                <div onClick={handleClickCreateDeck}>
                    <Button color={'blue'} title={'Create deck'} />
                </div>
            </div>
        </div>
    )
}
