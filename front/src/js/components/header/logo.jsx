import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const Logo = () => {
  const logoElement = useStaticQuery(graphql`
    query LogoQuery {
      allWpMediaItem(filter: { filename: { eq: "tester.jpg" } }) {
        edges {
          node {
            title
            mediaDetails {
              height
              width
            }
            sourceUrl
            altText
          }
        }
      }
    }
  `)

  if (logoElement.allWpMediaItem.edges.length) {
    const { title, sourceUrl, altText, mediaDetails } = logoElement.allWpMediaItem.edges[0].node

    return (
      <>
        <img src={sourceUrl} title={title} alt={altText} width={mediaDetails.width} height={mediaDetails.height} />
      </>
    )
  } else {
    return ""
  }
}

export default Logo
