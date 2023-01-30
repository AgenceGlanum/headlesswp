import { graphql, Link, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React from "react"

const Title = () => {
  const {
    wp: {
      generalSettings: { title }
    }
  } = useStaticQuery(graphql`
    query TitleQuery {
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  return (
    <h1 className="main-heading">
      <Link to="/">{parse(title)}</Link>
    </h1>
  )
}

export default Title
