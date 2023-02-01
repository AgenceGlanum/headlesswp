import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Footer from './layout/footer'
import Header from './layout/header'

const Layout = ({ isHomePage, children }) => {
    const {
        wp: {
            generalSettings: { title }
        }
    } = useStaticQuery(graphql`
        query LayoutQuery {
            wp {
                generalSettings {
                    title
                    description
                }
            }
        }
    `)

    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <Header></Header>

            <main>{children}</main>

            <Footer></Footer>
        </div>
    )
}

export default Layout
