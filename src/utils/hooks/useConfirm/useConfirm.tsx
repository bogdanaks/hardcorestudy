import React from 'react'

import { Confirm as ConfirmView } from './Confirm'

interface restPropsTypes {
    [propName: string]: any
}

export const useConfirm = ({ ...props }: restPropsTypes) => {
    const [isActive, setIsActive] = React.useState(false)

    const show = () => setIsActive(true)
    const hide = () => setIsActive(false)

    const Confirm = ({ children }: any) => (
        <>{isActive && <ConfirmView setIsActive={setIsActive}>{children}</ConfirmView>}</>
    )

    return {
        show,
        hide,
        Confirm,
        propsConfirm: props,
    }
}
