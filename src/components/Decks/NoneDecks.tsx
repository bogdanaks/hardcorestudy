import React from 'react'

import { Button } from '../Button/Button'
import { ModalDeck } from '../Modal/ModalDeck'

import styles from './styles.module.scss'

export const NoneDecks: React.FC = () => {
    const [showModal, setShowModal] = React.useState<boolean>(false)

    return (
        <div className={styles.noneDecks}>
            <div className={styles.container}>
                <h2>Вы еще не создали ни одной колоды.</h2>
                <p>Создайте колоду на любую интересующую вас тему</p>
                <div onClick={() => setShowModal(!showModal)}>
                    <Button color={'blue'} title={'Создать колоду'} />
                </div>
            </div>
            {showModal && <ModalDeck type="create" setShowModal={setShowModal} />}
        </div>
    )
}
