import React from 'react'
import { useSelector } from 'react-redux'
import { IoIosInformationCircleOutline, IoMdCheckmarkCircleOutline } from 'react-icons/io'

import { RootState } from '../../redux/types/rootTypes'

import styles from './styles.module.scss'

export const Alert = () => {
    const alerts = useSelector((state: RootState) => state.app.alert)

    if (alerts.length === 0) {
        return null
    }
    return (
        <>
            {alerts.map((al, index) => {
                return (
                    <div
                        key={al.id}
                        className={[
                            styles.alertBlock,
                            al.type === 'error' && styles.alertError,
                            al.type === 'success' && styles.alertSuccess,
                            al.type === 'info' && styles.alertInfo,
                        ].join(' ')}
                        style={{ bottom: index * 50 + 20 + 'px' }}>
                        {al.type === 'error' && <IoIosInformationCircleOutline />}
                        {al.type === 'success' && <IoMdCheckmarkCircleOutline />}
                        {al.type === 'info' && <IoIosInformationCircleOutline />}
                        <span>{al.message}</span>
                    </div>
                )
            })}
        </>
    )
}
