import React from 'react'

import styles from './styles.module.scss'

interface ButtonProps {
    color: 'blue' | 'red' | 'green'
    title: string
    theme: 'light' | 'dark'
}

export const Button: React.FC<ButtonProps> = ({ color, title, theme }) => (
    <button
        className={[
            styles.btn,
            color === 'blue'
                ? styles.blueBtn
                : color === 'red'
                ? styles.redBtn
                : color === 'green' && styles.greenBtn,
            theme === 'dark' ? styles.dark : '',
        ].join(' ')}>
        {title}
    </button>
)
