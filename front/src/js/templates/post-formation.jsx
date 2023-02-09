import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import React from 'react'

import Seo from '../components/seo'
import TermsTreeLinks from '../components/terms-tree-links'
import Layout from '../layout'

const PostFormationTemplate = ({ data: { previous, next, post } }) => {
    const featuredImage = {
        data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ''
    }

    const terms = post.terms.nodes

    return (
        <Layout>
            <article className="blog-post" itemScope itemType="http://schema.org/Article">
                <header>
                    <h1 itemProp="headline">{parse(post.title)}</h1>

                    <p>{post.date}</p>

                    <TermsTreeLinks terms={terms} />

                    {/* if we have a featured image for this post let's display it */}
                    {featuredImage?.data && <GatsbyImage image={featuredImage.data} alt={featuredImage.alt} style={{ marginBottom: 50 }} />}
                </header>

                {!!post.content && <section itemProp="articleBody">{parse(post.content)}</section>}

                <hr />

                <footer></footer>
            </article>

            <nav className="blog-post-nav">
                <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        listStyle: 'none',
                        padding: 0
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.uri} rel="prev">
                                ← {parse(previous.title)}
                            </Link>
                        )}
                    </li>

                    <li>
                        {next && (
                            <Link to={next.uri} rel="next">
                                {parse(next.title)} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    )
}

export const Head = ({ data: { post }, pageContext: { postType } }) => (
    <>
        <body className={`post post--${postType}`} />
        <Seo title={post.title} />
    </>
)

export default PostFormationTemplate

export const pageQuery = graphql`
    query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
        post: wpFormation(id: { eq: $id }) {
            id
            excerpt
            content
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            terms: competences {
                nodes {
                    id
                    parentId
                    taxonomyName
                    name
                    uri
                }
            }
            featuredImage {
                node {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
                        }
                    }
                }
            }
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
        previous: wpFormation(id: { eq: $previousPostId }) {
            uri
            title
        }
        next: wpFormation(id: { eq: $nextPostId }) {
            uri
            title
        }
    }
`
