import React from 'react'

import { sortCategories } from '../common/function-sort-categories'

const getListItems = dataset => {
    // Create a string containing the items for this list
    return dataset
        .map(item => {
            // Build a nested UL string by calling getTreeStrucureTemplate on this objects children
            const nested = getTreeStrucureTemplate(item.children || [])
            // Build the current item and add any nested lists
            return /* html */ `<li>
                <a href=${item.uri}>${item.name}</a>
                ${nested}
            </li>`
        })
        .join('') // Join the items into a single string
}

const getTreeStrucureTemplate = dataset => {
    // Only wrap the list in UL if it has contents
    if (dataset.length) {
        return /* html */ `<ul>${getListItems(dataset)}</ul>`
    } else {
        return ''
    }
}

const CategoriesTreeLinks = ({ categories }) => {
    const categoriesSortedArray = categories.length ? sortCategories(categories) : []

    if (categoriesSortedArray.length) {
        return <nav dangerouslySetInnerHTML={{ __html: getTreeStrucureTemplate(categoriesSortedArray) }} />
    } else {
        return null
    }
}

export default CategoriesTreeLinks
