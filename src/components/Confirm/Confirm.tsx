import React from 'react'

import styles from './styles.module.scss'

interface ConfirmProps {
    title: string
    desc: string
    hideConfirm: () => void
    yesConfirm: (args?: {}) => void
    propsConfirm: {
        [propName: string]: any
    }
    theme: 'dark' | 'light'
}

export const Confirm = ({
    title,
    desc,
    hideConfirm,
    yesConfirm,
    propsConfirm,
    theme,
}: ConfirmProps): JSX.Element => {
    return (
        <div className={[styles.confirmBlock, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <div className={styles.btnsConfirm}>
                <button className={styles.btnCancel} onClick={() => hideConfirm()}>
                    Нет
                </button>
                <button
                    className={styles.btnDel}
                    onClick={() => {
                        yesConfirm(propsConfirm && propsConfirm)
                        hideConfirm()
                    }}>
                    Да, удалить
                </button>
            </div>
        </div>
    )
}
