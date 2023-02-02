const request = (url, params = {}, method = 'GET', format = 'json') => {
    const options = {
        method
    }

    if (method === 'GET') {
        url += `?${new URLSearchParams(params)}`
    } else {
        let formData = params
        if (typeof params === 'object' && !(params instanceof FormData)) {
            formData = new FormData()
            for (const key in params) {
                formData.append(key, params[key])
            }
        }

        options.body = formData
    }

    return fetch(url, options).then(response => (format === 'json' ? response.json() : response.text()))
}

export const get = (url, params, format) => request(url, params, 'GET', format)
export const post = (url, params, format) => request(url, params, 'POST', format)
