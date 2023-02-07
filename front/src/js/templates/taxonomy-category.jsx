import { Link, graphql } from 'gatsby'
import parse from 'html-react-parser'
import React from 'react'

import Seo from '../components/seo'
import Layout from '../layout'

const TaxoCategoryTerm = ({ data, pageContext: { nextPagePath, previousPagePath, slug } }) => {
    const posts = data.allWpPost.nodes

    if (!posts.length) {
        return (
            <Layout isHomePage>
                <p>No blog posts found. Add posts to your WordPress site and they&#39;ll appear here!</p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
            <ol style={{ listStyle: 'none' }}>
                {posts.map(post => {
                    const title = post.title

                    return (
                        <li key={post.uri}>
                            <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                                <header>
                                    <h2>
                                        <Link to={post.uri} itemProp="url">
                                            <span itemProp="headline">{parse(title)}</span>
                                        </Link>
                                    </h2>
                                    <small>{post.date}</small>
                                </header>
                                <section itemProp="description">{parse(post.excerpt)}</section>
                            </article>
                        </li>
                    )
                })}
            </ol>

            {previousPagePath && (
                <>
                    <Link to={previousPagePath}>Previous page</Link>
                    <br />
                </>
            )}
            {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
        </Layout>
    )
}

export const Head = ({ pageContext: { slug, name } }) => (
    <>
        <body className={`taxonomy-term taxonomy-term--${slug}`} />
        <Seo title={`All ${name} posts`} />
    </>
)

export default TaxoCategoryTerm

export const pageQuery = graphql`
    query WordPressPostTerms($postsPerPage: Int!, $offset: Int!, $termID: Int!) {
        allWpPost(sort: { date: DESC }, limit: $postsPerPage, skip: $offset, filter: { terms: { nodes: { elemMatch: { id: {}, termTaxonomyId: { eq: $termID } } } } }) {
            nodes {
                excerpt
                uri
                date(formatString: "MMMM DD, YYYY")
                title
                excerpt
            }
        }
    }
`
