import React from 'react'

import styles from './styles.module.scss'

interface ButtonProps {
    color: 'blue' | 'red' | 'green'
    title: string
}

export const Button: React.FC<ButtonProps> = ({ color, title }) => (
    <button
        className={[
            styles.btn,
            color === 'blue'
                ? styles.blueBtn
                : color === 'red'
                ? styles.redBtn
                : color === 'green' && styles.greenBtn,
        ].join(' ')}>
        {title}
    </button>
)
