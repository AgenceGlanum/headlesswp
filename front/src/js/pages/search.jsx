import { graphql, useStaticQuery } from 'gatsby'
// this component queries for all of the content for the entire site
// and provides it to the child component which will handle the view layer - (searching, filtering, and rendering)
import React, { useEffect, useState } from 'react'

import { get } from '../common/ajax'
import { variables } from '../common/variables'
import SearchResults from '../components/search-results'
import Seo from '../components/seo'

export default function SearchPage() {
    const [searchEntriesArray, setsearchEntriesArray] = useState([])

    useEffect(() => {
        get(variables.restSearchURL, {}, 'json')
        .then((data) => {
            let newArray = data
            if (Object.values(newArray).length) {
                newArray = Object.values(newArray)
            }
            setsearchEntriesArray(newArray)
        })
    }, [])

    return <SearchResults data={searchEntriesArray} />
}

export const Head = () => <Seo title="Recherche" />
