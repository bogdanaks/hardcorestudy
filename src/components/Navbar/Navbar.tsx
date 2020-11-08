import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { IoIosStats, IoIosAlbums, IoIosColorWand } from 'react-icons/io'
import { FiMoon, FiSun } from 'react-icons/fi'

import styles from './styles.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import userImg from '../../assets/user.jpg'

import { setTheme } from '../../redux/actions/appAction'
import { RootState } from '../../redux/types/rootTypes'

export const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.app.theme)
    const [light, setLight] = React.useState<'light' | 'dark'>(theme)
    const handleLightClick = () => {
        if (light === 'light') {
            dispatch(setTheme('dark'))
            setLight('dark')
        } else {
            dispatch(setTheme('light'))
            setLight('light')
        }
    }

    return (
        <div className={[styles.navbar, light === 'dark' ? styles.dark : ''].join(' ')}>
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
            <button className={styles.changeTheme} onClick={handleLightClick}>
                {light === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            <div className={styles.user}>
                <img src={userImg} alt="User" />
            </div>
        </div>
    )
}
