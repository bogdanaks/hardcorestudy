import React from 'react'

import styles from './styles.module.scss'

import { IoIosSearch } from 'react-icons/io'

interface InputProps {
    color: 'dark' | 'light'
}

export const Input: React.FC<InputProps> = ({ color }) => {
    return (
        <div
            className={[styles.input, color === 'dark' ? styles.darkInput : styles.lightInput].join(
                ' ',
            )}>
            <input type="text" />
            <IoIosSearch />
        </div>
    )
}
