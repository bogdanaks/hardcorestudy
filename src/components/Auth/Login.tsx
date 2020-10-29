import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'

import logo from '../../assets/logo.png'
import styles from './styles.module.scss'

export const Login: React.FC = () => {
    const { values, handleChange, handleSubmit } = useForm(callback)

    function callback() {
        console.log('send')
    }

    return (
        <div className={styles.auth}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" />
            </div>
            <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.email}>
                    <input
                        id="emailI"
                        type="text"
                        name="email"
                        required
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="emailI" className={styles.labelEmail}>
                        E-mail
                    </label>
                </div>
                <div className={styles.password}>
                    <input
                        id="passwordI"
                        type="password"
                        name="password"
                        required
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="passwordI">Password</label>
                </div>
                <button type="submit">Войти</button>
            </form>
            <Link to="/register" className={styles.link}>
                Регистрация
            </Link>
            <span className={styles.site}>Hardcore Study</span>
        </div>
    )
}
