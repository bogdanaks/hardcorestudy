import React from 'react'

import styles from './styles.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'

export const Loader = () => {
    return (
        <div className={styles.loaderBlock}>
            <Logo className={styles.icon} />
        </div>
    )
}
