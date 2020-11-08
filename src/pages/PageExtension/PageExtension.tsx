import React from 'react'
import { useSelector } from 'react-redux'

import styles from './styles.module.scss'

import { RootState } from '../../redux/types/rootTypes'

export const PageExtension: React.FC = () => {
    const theme = useSelector((state: RootState) => state.app.theme)
    return (
        <div className={[styles.wrapper, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <h1>Extension page</h1>
        </div>
    )
}
