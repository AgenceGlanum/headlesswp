import { graphql } from 'gatsby'
import React from 'react'

import Seo from '../components/seo'
import Layout from '../layout'

const PageTemplate = ({ data: { page } }) => {
    return (
        <Layout>
            <h1>{page.title}</h1>
            <section dangerouslySetInnerHTML={{ __html: page.content }} />
        </Layout>
    )
}

export const Head = ({ data: { page } }) => <Seo title={page.title} seo={page.seo} />

export default PageTemplate

export const pageQuery = graphql`
    query PageById($id: String!) {
        page: wpPage(id: { eq: $id }) {
            id
            title
            content
            seo {
                title
                opengraphTitle
                opengraphType
                opengraphUrl
                opengraphSiteName
                opengraphPublishedTime
                opengraphDescription
                metaRobotsNoindex
                metaRobotsNofollow
                metaDesc
                canonical
                opengraphImage {
                    mediaItemUrl
                }
                schema {
                    raw
                }
            }
        }
    }
`
