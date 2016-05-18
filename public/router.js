const patternCache = {}

class Router {
    constructor (routes) {
        this.routes = routes || []
        this.history = []
        this.rootPage = ""

        // TODO: make sure initial routes are parameterized
        this.paramLookup = {}
        this.queries = {}
    }

    addRoute (url, dispatch) {
        this.routes.push({ url: url, dispatch: dispatch })
    }
    
    addQuery (path, query) {
        this.queries[path] = query
    }

    redirect (path, options) {
        const route = this.routes[path]
        window.history.replaceState("", path, path)

        route.load(options)
    }

    loadPage () {
        const url = location.hash.slice(1) || "/"
        const splitUrl = url.split("?")
        const path = splitUrl[0]
        const queryStr = splitUrl[1]
        const parts = path.split("/").filter(Boolean)

        this.rootPage = parts[0]

        // Parses the query.
        const query = queryStr && queryStr.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]

        if (query) {
            this.addQuery(`#${path.replace(/\/$/, "")}`, queryStr)
        }

        // Parses the params.
        // var params = []
        // var routeParts = parts.slice(0)
        // parts.forEach((part, index) => {
        //     const paramKey = this.paramLookup[part]

        //     if (paramKey) {
        //         const param = routeParts.splice(index + 1, 1)
        //         params.push(param[0])
        //     }
        // })
        
        // Starts to implement mo's work.
        for (var i = 0; i < this.routes.length; i++) {
            const route = this.routes[i]
            const match = this.matchUri(route.url, path)
            
            if (match) {
                route.dispatch({ params: match, query: query })
            }
        }

        // // Looks up route.
        // const route = this.routes[`/${routeParts.join("/")}`]
        // if (route.load) {
        //     // this becomes a returned promise that we could cancel, throttle, queue
        //     route.load({ params: params, query: query })
        // }
        
        // Updates the router history.
        this.history = []
        var historyParts = parts.slice(0)
        var root = "#"
        historyParts.map((part, index) => {
            const paramKey = this.paramLookup[part]
            var name
            var url
            
            if (paramKey) {
                // History shows params.
                const paramIndex = index + 1
                name = historyParts[paramIndex]
                url = `${root}/${part}/${historyParts[paramIndex]}`

                // Makes sure we skip over the param.
                historyParts.splice(paramIndex, 1)
            } else {
                name = part
                url = `${root}/${part}`
            }

            root = url

            if (this.queries[url]) {
                url = `${url}/?${this.queries[url]}`
            }
            this.history.push({ url: url, name: name })
        })
    }
    
    matchUri(pattern, uri) {
        const compiledPattern = this.compilePattern(pattern)
        const { regexString, params } = compiledPattern
        const match = uri.match(new RegExp(regexString, 'i'))
        if (!match) {
            return null
        }

        return params.reduce((result, param, index) => {
            result[param] = match[index+1]
            return result
        }, {})
    }
    
    compilePattern(pattern) {
        let compiled = patternCache[pattern];
        if (!compiled) {
            compiled = this._compilePattern(pattern);
            patternCache[pattern] = compiled;
        }
        return compiled
    }
    
    _compilePattern(pattern) {
        const params = []
        const regexParts = []

        pattern
            .split('/')
            .filter((s) => !!s)
            .forEach((segment) => {
                // it is a parameter
                if (segment.indexOf(":") === 0 && segment.length > 1) {
                    params.push(segment.slice(1))
                    regexParts.push("([^/]+)")
                } else {
                    regexParts.push(segment)
                }
            })

        regexParts.push("?")

        return {
            regexString: regexParts.join('/'),
            params
        }
    }
}