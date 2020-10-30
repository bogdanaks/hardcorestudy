import React from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import styles from './styles.module.scss'

export const Auth: React.FC = () => {
    const history = useHistory()

    const handleLoginClick = () => {
        history.push('/login')
    }
    const handleRegClick = () => {
        history.push('/register')
    }

    return (
        <div className={[styles.authMain, styles.auth].join(' ')}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.content}>
                <span>Пожалуйста войдите, чтобы я мог управлять твоей памятью!</span>
                <div className={styles.btnsBlock}>
                    <button className={styles.btnReg} onClick={handleRegClick}>
                        Зарегистрироваться
                    </button>
                    <button className={styles.btnLogin} onClick={handleLoginClick}>
                        Войти
                    </button>
                </div>
            </div>

            <span className={styles.site}>Hardcore Study</span>
        </div>
    )
}
