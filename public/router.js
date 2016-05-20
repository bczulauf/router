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

    addRoute (url, handler) {
        this.routes.push({ url: url, handler: handler })
    }

    redirect (path, options) {
        const route = this.routes[path]
        window.history.replaceState("", path, path)

        route.dispatch(options)
    }

    dispatch () {
        const url = location.hash.slice(1) || "/"
        const splitUrl = url.split("?")
        const path = splitUrl[0]
        const queryStr = splitUrl[1]

        // Parses the query.
        const query = queryStr && queryStr.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]

        // Saves a reference of the query for the router history.
        if (query) {
            this.queries[`#${path.replace(/\/$/, "")}`] = queryStr
        }
        
        // Performs a pattern match.
        var params
        for (var i = 0; i < this.routes.length; i++) {
            const route = this.routes[i]
            params = this.matchUri(route.url, path)
            
            if (params) {
                route.handler({ params: params, query: query })
                break
            }
        }
        
        // Updates the router history.
        this.history = []
        var historyPath = "#"
        const parts = path.split("/").filter(Boolean)
        parts.forEach((part, index) => {
            // WONT WORK. NEED REVERSE PATTERN MATCH???
            if (params[part] && params[part] === parts[index + 1]) {
                
            } else {
                var url = `${historyPath}/${part}`
                
                if (this.queries[url]) {
                    url = `${url}/?${this.queries[url]}`
                }
                
                this.history.push({ url: url, name: part })    
            }
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