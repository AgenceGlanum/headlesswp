import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import { flatMenuListToHierarchical } from "../../common/function-menu-flat-hierarchically"

const MenuPrimary = () => {
  const menuQuery = useStaticQuery(graphql`
    query menuQuery {
      allWpMenuItem(filter: { locations: { eq: GATSBY_HEADER_MENU } }) {
        nodes {
          id
          label
          title
          path
          parentId
          target
        }
      }
    }
  `)

  const menuList = flatMenuListToHierarchical(menuQuery.allWpMenuItem.nodes)
  return (
    <>
      {menuList ? (
        <nav>
          {menuList.map(element => (
            <a key={element.id} href={element.path} target={element.target} title={element.title}>
              {element.label}
            </a>
          ))}
        </nav>
      ) : null}
    </>
  )
}

export default MenuPrimary
