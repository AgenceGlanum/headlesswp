const path = require('path')
const chunk = require('lodash/chunk')
const { dd } = require('dumper.js')

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
    const pages = await getPages(gatsbyUtilities)
    // dd(pages)
    if (pages.length) {
        await createPages({ pages, gatsbyUtilities })
    }

    const posts = await getPosts(gatsbyUtilities, 'post')
    if (posts.length) {
        await createIndividualBlogPostPages(posts, gatsbyUtilities, 'post')
        await createBlogPostArchive(posts, gatsbyUtilities, 'post')
    }

    const categoryTerms = await getTaxonomyTerms(gatsbyUtilities, 'category', ['posts'])
    if (categoryTerms.length) {
        await createTaxonomyTermsPages(categoryTerms, gatsbyUtilities, 'category', ['posts'])
    }

    const competenceTerms = await getTaxonomyTerms(gatsbyUtilities, 'competence', ['emplois', 'formations', 'metiers'])
    if (competenceTerms.length) {
        await createTaxonomyTermsPages(competenceTerms, gatsbyUtilities, 'competence', ['emplois', 'formations', 'metiers'])
    }

    const emploiPosts = await getPosts(gatsbyUtilities, 'emploi')
    if (emploiPosts.length) {
        await createIndividualBlogPostPages(emploiPosts, gatsbyUtilities, 'emploi')
        await createBlogPostArchive(emploiPosts, gatsbyUtilities, 'emploi')
    }

    const formationPosts = await getPosts(gatsbyUtilities, 'formation')
    if (formationPosts.length) {
        await createIndividualBlogPostPages(formationPosts, gatsbyUtilities, 'formation')
        await createBlogPostArchive(formationPosts, gatsbyUtilities, 'formation')
    }

    const metierPosts = await getPosts(gatsbyUtilities, 'metier')
    if (metierPosts.length) {
        await createIndividualBlogPostPages(metierPosts, gatsbyUtilities, 'metier')
        await createBlogPostArchive(metierPosts, gatsbyUtilities, 'metier')
    }
}

/*
 * Generate pages
 * */
async function createPages({ pages, gatsbyUtilities }) {
    return Promise.all(
        pages.map(({ page }) =>
            gatsbyUtilities.actions.createPage({
                path: page.uri,
                component: path.resolve('./src/js/templates/page.jsx'),
                context: {
                    id: page.id
                }
            })
        )
    )
}

// Fetch all pages
async function getPages({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
        query WpPages {
            allWpPage {
                edges {
                    page: node {
                        id
                        uri
                    }
                }
            }
        }
    `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild('There was an error loading your blog posts', graphqlResult.errors)
        return
    }

    return graphqlResult.data.allWpPage.edges
}

/*
 * Generate posts pages
 * */
async function createIndividualBlogPostPages(posts, gatsbyUtilities, postType) {
    if (!postType) {
        postType = 'post'
    }

    return Promise.all(
        posts.map(({ previous, post, next }) =>
            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            gatsbyUtilities.actions.createPage({
                // Use the WordPress uri as the Gatsby page path
                // This is a good idea so that internal links and menus work 👍
                path: post.uri,

                // use the blog post template as the page component
                component: postType === 'post' ? path.resolve('./src/js/templates/post.jsx') : path.resolve(`./src/js/templates/post-${postType}.jsx`),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // we need to add the post id here
                    // so our blog post template knows which blog post
                    // the current page is (when you open it in a browser)
                    id: post.id,
                    postType: postType,

                    // We also use the next and previous id's to query them and add links!
                    previousPostId: previous ? previous.id : null,
                    nextPostId: next ? next.id : null
                }
            })
        )
    )
}

// Fetch posts
async function getPosts({ graphql, reporter }, postType) {
    const postTypeUpper = postType.charAt(0).toUpperCase() + postType.slice(1)

    const graphqlResult = await graphql(/* GraphQL */ `
        query WpPosts {
            allWp${postTypeUpper}(sort: { date: DESC }) {
                edges {
                    previous {
                        id
                    }
                    post: node {
                        id
                        uri
                    }
                    next {
                        id
                    }
                }
            }
        }
    `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild('There was an error loading your blog posts', graphqlResult.errors)
        return
    }

    return graphqlResult.data[`allWp${postTypeUpper}`].edges
}

/*
 * Generate archives pages
 * */
async function createBlogPostArchive(posts, gatsbyUtilities, postType) {
    const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
        {
            wp {
                readingSettings {
                    postsPerPage
                }
            }
        }
    `)

    const { postsPerPage } = graphqlResult.data.wp.readingSettings

    const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
        postsChunkedIntoArchivePages.map(async (_posts, index) => {
            const pageNumber = index + 1

            const getPagePath = page => {
                if (page > 0 && page <= totalPages) {
                    // Since our homepage is our blog page
                    // we want the first page to be "/" and any additional pages
                    // to be numbered.
                    // "/blog/2" for example
                    if (postType === 'post') {
                        return page === 1 ? '/' : `/blog/${page}`
                    } else {
                        return page === 1 ? `/${postType}` : `/${postType}/${page}`
                    }
                }

                return null
            }

            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),

                // use the blog post archive template as the page component
                component: postType === 'post' ? path.resolve('./src/js/templates/archive.jsx') : path.resolve(`./src/js/templates/archive-${postType}.jsx`),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // the index of our loop is the offset of which posts we want to display
                    // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                    // etc
                    offset: index * postsPerPage,
                    postType: postType,

                    // We need to tell the template how many posts to display too
                    postsPerPage: postsPerPage,

                    nextPagePath: getPagePath(pageNumber + 1),
                    previousPagePath: getPagePath(pageNumber - 1)
                }
            })
        })
    )
}

/*
 * Generate taxonomy terms pages
 * */
async function createTaxonomyTermsPages(terms, gatsbyUtilities, taxonomy, postsTypeNames) {
    const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
        {
            wp {
                readingSettings {
                    postsPerPage
                }
            }
        }
    `)

    const { postsPerPage } = graphqlResult.data.wp.readingSettings

    return Promise.all(
        terms.map(async (term, index) => {
            if (postsTypeNames.length) {
                postsTypeNames.forEach(postsTypeName => {
                    const postsChunkedIntoArchivePages = chunk(term[taxonomy][postsTypeName].nodes, postsPerPage)
                    const totalPages = postsChunkedIntoArchivePages.length

                    Promise.all(
                        postsChunkedIntoArchivePages.map(async (_posts, index) => {
                            const pageNumber = index + 1

                            const getPagePath = page => {
                                if (page > 0 && page <= totalPages) {
                                    return page === 1 ? term[taxonomy].uri : `${term[taxonomy].uri}${page}`
                                }

                                return null
                            }

                            // createPage is an action passed to createPages
                            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
                            await gatsbyUtilities.actions.createPage({
                                path: getPagePath(pageNumber),

                                // use the blog post archive template as the page component
                                component: path.resolve(`./src/js/templates/taxonomy-${taxonomy}.jsx`),

                                // `context` is available in the template as a prop and
                                // as a variable in GraphQL.
                                context: {
                                    // the index of our loop is the offset of which posts we want to display
                                    // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                                    // etc
                                    offset: index * postsPerPage,
                                    termID: term[taxonomy].termTaxonomyId,
                                    slug: term[taxonomy].slug,
                                    name: term[taxonomy].name,

                                    // We need to tell the template how many posts to display too
                                    postsPerPage: postsPerPage,

                                    nextPagePath: getPagePath(pageNumber + 1),
                                    previousPagePath: getPagePath(pageNumber - 1)
                                }
                            })
                        })
                    )
                })
            }
        })
    )
}

// Fetch taxonomy terms
async function getTaxonomyTerms({ graphql, reporter }, taxonomy, postsTypeNames) {
    const taxonomyUpper = taxonomy.replace(/(.)([^-_|$]*)[-_]*/g, (_, letter, word) => `${letter.toUpperCase()}${word.toLowerCase()}`)

    let postTypeString = ''
    if (postsTypeNames.length) {
        postsTypeNames.forEach(postTypeName => {
            postTypeString += `${postTypeName} {
                nodes {
                    id
                }
            }`
        })
    }


    const graphqlResult = await graphql(/* GraphQL */ `
        query WpTaxonomy {
            allWp${taxonomyUpper} {
                edges {
                    previous {
                        id
                    }
                    ${taxonomy}: node {
                        id
                        name
                        uri
                        slug
                        termTaxonomyId
                        ${postTypeString}
                    }
                    next {
                        id
                    }
                }
            }
        }
    `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild('There was an error loading your blog posts', graphqlResult.errors)
        return
    }

    return graphqlResult.data[`allWp${taxonomyUpper}`].edges
}
