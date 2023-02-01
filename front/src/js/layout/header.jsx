import React from 'react'

import Logo from '../components/header/logo'
import MenuPrimary from '../components/header/menu'
import Title from '../components/header/title'

const Header = () => {
    return (
        <header>
            <Title></Title>
            <Logo></Logo>
            <MenuPrimary></MenuPrimary>
        </header>
    )
}

export default Header
