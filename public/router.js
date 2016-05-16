class Router {
    constructor (routes, options) {
        this.routes = routes
        this.nav = options && options.nav
        this.history = []
        this.rootPage = ""

        // TODO: make sure initial routes are parameterized
        this.paramLookup = {}
    }

    addRoute (path, loadFn) {
        const parts = path.split("/")
        const count = parts.length

        if (parts[parts.length - 1].indexOf(":") > -1) {
            this.paramLookup[parts[parts.length - 2]] = parts[parts.length - 1].replace( /:/, "" )
            path = path.split(":")[0].replace(/\/$/, "")
        }

        this.routes[path] = { load: loadFn }
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

        // Parses the params.
        var params = []
        var routeParts = parts.slice(0)
        parts.forEach((part, index) => {
            const paramKey = this.paramLookup[part]

            if (paramKey) {
                const param = routeParts.splice(index + 1, 1)
                params.push(param[0])
            }
        })

        // Looks up route.
        const route = this.routes[`/${routeParts.join("/")}`]
        if (route.load) {
            route.load({ params: params, query: query })
        }
        
        // Updates the router history.
        this.history = []
        var historyParts = parts.slice(0)
        var root = "#"
        historyParts.map((part, index) => {
            const paramKey = this.paramLookup[part]
            var name
            var url
            
            if (paramKey) {
                // History show params.
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
            this.history.push({ url: url, name: name })
        })
    }
}