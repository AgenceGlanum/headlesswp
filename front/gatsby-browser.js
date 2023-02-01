/**
 * This file lets you respond to Gatsby-specific events within the browser,
 * and wrap your page components in additional global components.
 */

import './src/scss/styles.scss'

export const onInitialClientRender = () => {
    console.log('ReactDOM.render has executed')
}
