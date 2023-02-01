import { graphql } from 'gatsby'
import React from 'react'

import Seo from '../components/seo'
import Layout from '../layout'

const NotFoundPage = ({ data, location }) => {
    return (
        <Layout location={location}>
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    )
}

export const Head = () => <Seo title="404: Not Found" />

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
