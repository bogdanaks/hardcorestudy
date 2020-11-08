import React from 'react'

import { Button } from '../Button/Button'
import { ModalCard } from '../Modal/ModalCard'

import styles from './styles.module.scss'

export const NoneCards: React.FC<{ deckId: string; theme: 'dark' | 'light' }> = ({
    deckId,
    theme,
}) => {
    const [showModal, setShowModal] = React.useState<boolean>(false)
    return (
        <div className={[styles.noneCards, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <div className={styles.container}>
                <h2>В этой колоде нет ни одной карты</h2>
                <div onClick={() => setShowModal(true)}>
                    <Button color={'blue'} title={'Создать карту'} theme={theme} />
                </div>
            </div>
            {showModal && (
                <ModalCard
                    type="create"
                    setShowModal={setShowModal}
                    deckId={deckId}
                    theme={theme}
                />
            )}
        </div>
    )
}
