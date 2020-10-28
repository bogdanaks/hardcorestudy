import React from 'react'

import styles from './styles.module.scss'

export const Main: React.FC = () => {
    return (
        <div className={styles.mainWrapper}>
            <h1>Main</h1>
            <button>Click1</button>
        </div>
    )
}
