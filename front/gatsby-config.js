const autoprefixer = require('autoprefixer')

/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 * List of plugins : https://www.gatsbyjs.com/plugins/
 */

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-page-creator',
            options: {
                path: `${__dirname}/src/js/pages`
            }
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                postCssPlugins: [autoprefixer()]
            }
        },
        {
            /**
             * First up is the WordPress source plugin that connects Gatsby
             * to your WordPress site.
             *
             * visit the plugin docs to learn more
             * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
             *
             */
            resolve: 'gatsby-source-wordpress',
            options: {
                url: process.env.WPGRAPHQL_URL || 'http://app.headlesswp.local/graphql'
            }
        },

        {
            /**
             * We need this plugin so that it adds the "File.publicURL" to our site
             * It will allow us to access static url's for assets like PDF's
             *
             * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
             */
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'assets',
                path: `${__dirname}/content/assets`
            }
        },

        /**
         * The following two plugins are required if you want to use Gatsby image
         * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
         * if you're curious about it.
         */
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Gatsby Starter WordPress Blog',
                short_name: 'GatsbyJS & WP',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'content/assets/gatsby-icon.png'
            }
        }
    ]
}
