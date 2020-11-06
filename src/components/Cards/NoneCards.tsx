import React from 'react'

import { Button } from '../Button/Button'
import { ModalCard } from '../Modal/ModalCard'

import styles from './styles.module.scss'

export const NoneCards: React.FC<{ deckId: string }> = ({ deckId }) => {
    const [showModal, setShowModal] = React.useState<boolean>(false)
    return (
        <div className={styles.noneCards}>
            <div className={styles.container}>
                <h2>В этой колоде нет ни одной карты</h2>
                <div onClick={() => setShowModal(true)}>
                    <Button color={'blue'} title={'Создать карту'} />
                </div>
            </div>
            {showModal && <ModalCard setShowModal={setShowModal} deckId={deckId} />}
        </div>
    )
}
