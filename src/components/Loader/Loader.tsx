import React from 'react'

import './styles.css'
export const Loader: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
    return (
        <div className={'wrapper ' + theme}>
            <div className="loader"></div>
        </div>
    )
}
