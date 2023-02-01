import React from 'react'

import Footer from './layout/footer'
import Header from './layout/header'

const Layout = ({ isHomePage, children }) => {
    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <Header></Header>

            <main className="main">{children}</main>

            <Footer></Footer>
        </div>
    )
}

export default Layout
