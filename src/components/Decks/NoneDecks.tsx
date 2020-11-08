import React from 'react'

import { Button } from '../Button/Button'
import { ModalDeck } from '../Modal/ModalDeck'

import styles from './styles.module.scss'

export const NoneDecks: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
    const [showModal, setShowModal] = React.useState<boolean>(false)

    return (
        <div className={[styles.noneDecks, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <div className={styles.container}>
                <h2>Вы еще не создали ни одной колоды.</h2>
                <p>Создайте колоду на любую интересующую вас тему</p>
                <div onClick={() => setShowModal(!showModal)}>
                    <Button color={'blue'} title={'Создать колоду'} theme={theme} />
                </div>
            </div>
            {showModal && <ModalDeck type="create" setShowModal={setShowModal} theme={theme} />}
        </div>
    )
}
