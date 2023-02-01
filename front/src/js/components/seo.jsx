/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'

const Seo = ({ title, seo }) => {
    const mainTitle = seo?.title || title

    const metaDesc = seo?.metaDesc
    const canonical = seo?.canonical
    const opengraphImage = seo?.opengraphImage?.mediaItemUrl
    const opengraphTitle = seo?.opengraphTitle || title
    const opengraphType = seo?.opengraphType
    const opengraphUrl = seo?.opengraphUrl
    const opengraphSiteName = seo?.opengraphSiteName
    const opengraphPublishedTime = seo?.opengraphPublishedTime
    const opengraphDescription = seo?.opengraphDescription

    const robotsIndex = seo?.metaRobotsNoindex
    const robotsFollow = seo?.metaRobotsNofollow
    const schema = seo?.schema?.raw

    return (
        <>
            <title>{mainTitle}</title>
            {opengraphTitle && <meta property="og:title" content={opengraphTitle} />}
            {opengraphDescription && <meta property="og:description" content={opengraphDescription} />}
            {opengraphUrl && <meta property="og:url" content={opengraphUrl} />}
            {opengraphSiteName && <meta property="og:site_name" content={opengraphSiteName} />}
            {opengraphImage && <meta property="og:image" content={opengraphImage} />}
            {opengraphType && <meta property="og:type" content={opengraphType} />}
            {opengraphPublishedTime && <meta name="article:published_time" content={opengraphPublishedTime} />}
            {metaDesc && <meta name="description" content={metaDesc} />}
            {canonical && <link href={canonical} rel="canonical" />}

            {robotsIndex || (robotsFollow && <meta name="robots" content={`${robotsIndex}, ${robotsFollow}`} />)}
            {schema && (
                <script type="application/ld+json" className="yoast-schema-graph">
                    {schema}
                </script>
            )}
        </>
    )
}

export default Seo
