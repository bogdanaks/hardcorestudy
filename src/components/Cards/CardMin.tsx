import React from 'react'
import styles from './styles.module.scss'

import { FiEdit2 } from 'react-icons/fi'

interface CardProps {
    question: string
    answer: string
    number: number
}

export const CardMin: React.FC<CardProps> = ({ question, answer, number }) => {
    return (
        <>
            <span>{number}</span>
            <div className={styles.cardMin}>
                <span className={styles.questionMin}>{question}</span>
                <div className={styles.lineBetwen}></div>
                <span className={styles.answerMin}>{answer}</span>
                <button>
                    <FiEdit2 />
                </button>
            </div>
        </>
    )
}
