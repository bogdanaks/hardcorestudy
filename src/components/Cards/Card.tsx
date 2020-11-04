import React from 'react'

import styles from './styles.module.scss'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface CardProps {
    question: string
    answer: string
    allCount: number
    curCard: number
    setCurCard: React.Dispatch<React.SetStateAction<number>>
}

export const Card: React.FC<CardProps> = ({ question, answer, allCount, curCard, setCurCard }) => {
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false)

    const handleLeftClick = () => {
        setIsFlipped(false)
        setCurCard(curCard - 1)
    }
    const handleRightClick = () => {
        setIsFlipped(false)
        setCurCard(curCard + 1)
    }

    return (
        <div className={styles.card}>
            <div
                className={[styles.cardWrapper, isFlipped ? styles.flip : ''].join(' ')}
                onClick={() => setIsFlipped(!isFlipped)}>
                <div className={[styles.cardFull, styles.cardFullFront].join(' ')}>
                    <p>{question}</p>
                </div>
                <div className={[styles.cardFull, styles.cardFullBack].join(' ')}>
                    <p>{answer}</p>
                </div>
            </div>

            <div className={styles.cardBtns}>
                <button onClick={handleLeftClick} disabled={curCard === 0 ? true : false}>
                    <FiChevronLeft />
                </button>
                <span>{`${curCard + 1}/${allCount}`}</span>
                <button
                    onClick={handleRightClick}
                    disabled={curCard + 1 === allCount ? true : false}>
                    <FiChevronRight />
                </button>
            </div>
        </div>
    )
}
