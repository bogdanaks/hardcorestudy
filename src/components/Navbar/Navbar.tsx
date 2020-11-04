import React from 'react'
import { NavLink } from 'react-router-dom'

import { IoIosStats, IoIosAlbums, IoIosColorWand } from 'react-icons/io'
import { FiMoon, FiSun } from 'react-icons/fi'

import styles from './styles.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import userImg from '../../assets/user.jpg'

export const Navbar = () => {
    const [light, setLight] = React.useState<boolean>(true)

    return (
        <div className={styles.navbar}>
            <NavLink to="/" className={styles.logo}>
                <div className={styles.logoBlock}>
                    <Logo />
                    <h1>
                        HARDCORE
                        <br />
                        STUDY
                    </h1>
                </div>
            </NavLink>
            <div className={styles.links}>
                <NavLink to="/stats" activeClassName={styles.active}>
                    <IoIosStats />
                    Статистика
                </NavLink>
                <NavLink to="/decks" activeClassName={styles.active}>
                    <IoIosAlbums />
                    Колоды
                </NavLink>
                <NavLink to="/extension" activeClassName={styles.active}>
                    <IoIosColorWand />
                    Расширение
                </NavLink>
            </div>
            <button className={styles.changeTheme} onClick={() => setLight(!light)}>
                {light ? <FiMoon /> : <FiSun />}
            </button>
            <div className={styles.user}>
                <img src={userImg} alt="User" />
            </div>
        </div>
    )
}
