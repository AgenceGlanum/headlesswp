import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { flatMenuListToHierarchical } from '../../common/function-menu-flat-hierarchically'

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
                    <ul>
                        {menuList.map(element => (
                            <li key={element.id}>
                                <a href={element.path} target={element.target} title={element.title}>
                                    {element.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : null}
        </>
    )
}

export default MenuPrimary
