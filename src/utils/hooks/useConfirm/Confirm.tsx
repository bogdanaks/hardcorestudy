import React, { memo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './styles.module.scss'

interface ModalProps {
    children: any
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    theme: 'dark' | 'light'
}

export const Confirm = memo<ModalProps>(({ children, setIsActive, theme }) => {
    const body = document.body
    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsActive(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            setIsActive(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!body) return null

    return createPortal(
        <div className={[styles.wrapperConfirm, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <div className={styles.modalConfirm} ref={modalRef}>
                {children}
            </div>
        </div>,
        body,
    )
})
