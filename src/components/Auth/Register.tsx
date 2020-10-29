import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import styles from './styles.module.scss'

export const Register: React.FC = () => {
    return (
        <div className={styles.auth}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" />
            </div>
            <form className={styles.formLogin}>
                <div className={styles.email}>
                    <input id="nameI" type="text" name="name" required />
                    <label htmlFor="nameI" className={styles.labelEmail}>
                        Name
                    </label>
                </div>
                <div className={styles.email}>
                    <input id="emailI" type="text" name="email" required />
                    <label htmlFor="emailI" className={styles.labelEmail}>
                        E-mail
                    </label>
                </div>
                <div className={styles.password}>
                    <input id="passwordI" type="password" name="password" required />
                    <label htmlFor="passwordI">Password</label>
                </div>
                <button>Зарегистрироваться</button>
            </form>
            <Link to="/login" className={styles.link}>
                Войти
            </Link>
            <span className={styles.site}>Hardcore Study</span>
        </div>
    )
}
