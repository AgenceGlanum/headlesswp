export function sortTerms(data, parentID = null) {
    if (data.length) {
        return data.reduce((r, e) => {
            if (parentID == e.parentId) {
                const object = { ...e }
                const children = sortTerms(data, e.id)

                if (children.length) {
                    object.children = children
                }

                r.push(object)
            }

            return r
        }, [])
    }
}
