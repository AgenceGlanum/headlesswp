import React from 'react'

import { sortTerms } from '../common/function-sort-terms'

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

const TermsTreeLinks = ({ terms }) => {
    const termsSortedArray = terms.length ? sortTerms(terms) : []

    if (termsSortedArray.length) {
        return <nav dangerouslySetInnerHTML={{ __html: getTreeStrucureTemplate(termsSortedArray) }} />
    } else {
        return null
    }
}

export default TermsTreeLinks
