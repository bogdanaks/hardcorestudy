import React from 'react'

import { Confirm as ConfirmView } from './Confirm'

interface restPropsTypes {
    [propName: string]: any
    theme: 'dark' | 'light'
}

export const useConfirm = ({ theme, ...props }: restPropsTypes) => {
    const [isActive, setIsActive] = React.useState(false)

    const show = () => setIsActive(true)
    const hide = () => setIsActive(false)

    const Confirm = ({ children }: any) => (
        <>
            {isActive && (
                <ConfirmView setIsActive={setIsActive} theme={theme}>
                    {children}
                </ConfirmView>
            )}
        </>
    )

    return {
        show,
        hide,
        Confirm,
        propsConfirm: props,
    }
}
