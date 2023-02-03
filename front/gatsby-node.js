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
    // Query our Pages from the GraphQL server
    const pages = await getPages(gatsbyUtilities)
    // dd(pages)
    if (pages.length) {
        await createPages({ pages, gatsbyUtilities })
    }

    // Query our posts from the GraphQL server
    const posts = await getPosts(gatsbyUtilities)
    if (posts.length) {
        await createIndividualBlogPostPages({ posts, gatsbyUtilities })
        await createBlogPostArchive({ posts, gatsbyUtilities })
    }

    // Query our categories from the GraphQL server
    const categories = await getCategories(gatsbyUtilities)
    if (categories.length) {
        await createCategoryPages({ categories, gatsbyUtilities })
    }
}

/*
 * Generate pages
 * */
const createPages = async ({ pages, gatsbyUtilities }) =>
    Promise.all(
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
 * Generate posts
 * */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
    Promise.all(
        posts.map(({ previous, post, next }) =>
            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            gatsbyUtilities.actions.createPage({
                // Use the WordPress uri as the Gatsby page path
                // This is a good idea so that internal links and menus work 👍
                path: post.uri,

                // use the blog post template as the page component
                component: path.resolve('./src/js/templates/post.jsx'),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // we need to add the post id here
                    // so our blog post template knows which blog post
                    // the current page is (when you open it in a browser)
                    id: post.id,

                    // We also use the next and previous id's to query them and add links!
                    previousPostId: previous ? previous.id : null,
                    nextPostId: next ? next.id : null
                }
            })
        )
    )

// Fetch posts
async function getPosts({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
        query WpPosts {
            allWpPost(sort: { date: DESC }) {
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

    return graphqlResult.data.allWpPost.edges
}

/*
 * Generate archives
 * */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
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
                    return page === 1 ? '/' : `/blog/${page}`
                }

                return null
            }

            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),

                // use the blog post archive template as the page component
                component: path.resolve('./src/js/templates/archive.jsx'),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // the index of our loop is the offset of which posts we want to display
                    // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                    // etc
                    offset: index * postsPerPage,

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
 * Generate categories
 * */
async function createCategoryPages({ categories, gatsbyUtilities }) {
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
        categories.map(async (_category, index) => {
            const postsChunkedIntoArchivePages = chunk(_category.category.posts.nodes, postsPerPage)
            const totalPages = postsChunkedIntoArchivePages.length

            Promise.all(
                postsChunkedIntoArchivePages.map(async (_posts, index) => {
                    const pageNumber = index + 1

                    const getPagePath = page => {
                        if (page > 0 && page <= totalPages) {
                            return page === 1 ? _category.category.uri : `${_category.category.uri}${page}`
                        }

                        return null
                    }

                    // createPage is an action passed to createPages
                    // See https://www.gatsbyjs.com/docs/actions#createPage for more info
                    await gatsbyUtilities.actions.createPage({
                        path: getPagePath(pageNumber),

                        // use the blog post archive template as the page component
                        component: path.resolve('./src/js/templates/category.jsx'),

                        // `context` is available in the template as a prop and
                        // as a variable in GraphQL.
                        context: {
                            // the index of our loop is the offset of which posts we want to display
                            // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                            // etc
                            offset: index * postsPerPage,
                            termID: _category.category.termTaxonomyId,
                            slug: _category.category.slug,
                            name: _category.category.name,

                            // We need to tell the template how many posts to display too
                            postsPerPage: postsPerPage,

                            nextPagePath: getPagePath(pageNumber + 1),
                            previousPagePath: getPagePath(pageNumber - 1)
                        }
                    })
                })
            )
        })
    )
}

// Fetch categories
async function getCategories({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
        query WpCategories {
            allWpCategory {
                edges {
                    previous {
                        id
                    }
                    category: node {
                        id
                        name
                        uri
                        slug
                        termTaxonomyId
                        posts {
                            nodes {
                                id
                            }
                        }
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

    return graphqlResult.data.allWpCategory.edges
}
