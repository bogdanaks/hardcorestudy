import React from 'react'

import styles from './styles.module.scss'

import { useDate } from '../../utils/hooks/useDate'

interface DeckProps {
    title: string
    description: string
    color: string
    date: number
    cardsCount: number
    active: boolean
}

export const Deck: React.FC<DeckProps> = ({
    title,
    description,
    color,
    date,
    cardsCount,
    active,
}) => {
    const { monthEn, day, year } = useDate(new Date(date))
    return (
        <div className={styles.deckBlock}>
            <div className={[styles.deck, active ? styles.active : '', styles[color]].join(' ')}>
                <div className={styles.titleBlock}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.descriptionBlock}>
                    <p>{description}</p>
                </div>
                <div className={styles.footer}>
                    <span>{cardsCount} cards</span>
                    <span className={styles.data}>{`${monthEn} ${day}, ${year}`}</span>
                </div>
            </div>
            <div className={styles.card1}></div>
            <div className={styles.card2}></div>
            <div className={styles.card3}></div>
            <div className={[styles.background, styles[color]].join(' ')}></div>
        </div>
    )
}
