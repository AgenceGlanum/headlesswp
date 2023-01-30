import { graphql } from "gatsby"
import React from "react"

import Seo from "../components/seo"
import Layout from "../layout"

const PageTemplate = ({ data: { page } }) => {
  return <Layout></Layout>
}

export const Head = ({ data: { page } }) => <Seo title={page.title} />

export default PageTemplate

export const pageQuery = graphql`
  query PageById($id: String!) {
    page: wpPage(id: { eq: $id }) {
      id
      title
    }
  }
`
