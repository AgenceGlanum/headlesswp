import { graphql } from 'gatsby'
import React from 'react'

import Seo from '../components/seo'
import Layout from '../layout'

const NotFoundPage = ({ data, location }) => {
    return (
        <Layout location={location}>
            <h1>404</h1>
            <div className="img-wrapper">
                {/* https://dribbble.com/shots/14638411-Illustration-for-Joom-404-page-Concept */}
                <img src="./img/404.webp" alt="404 picture" />
            </div>

            <p>
                Peut-être auriez-vous plus de chance en lancant une <a href="/search">recherche</a>
            </p>
        </Layout>
    )
}

export const Head = ({ pageContext: { postType } }) => (
    <>
        <body className="not-found" />
        <Seo title="404: Not Found" />
    </>
)

export default NotFoundPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
