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
        const historyName = parts[parts.length - 1]

        this.rootPage = parts[0]

        // Parses the query.
        const query = queryStr && queryStr.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]

        // Parses the params.
        var params = []
        var routes = parts.slice(0)
        var historyList = parts.slice(0)
        parts.forEach((part, index) => {
            const paramKey = this.paramLookup[part]

            if (paramKey) {
                const param = routes.splice(index + 1, 1)
                historyList.splice(index, 1)
                params.push(param[0])
            }
        })

        // Looks up route.
        const route = this.routes[`/${routes.join("/")}`]
        if (route.load) {
            route.load({ params: params, query: query })
        }
        
        // Updates the router history.
        for (var i = 0; i < historyList.length; i++) {
            var historyPart = this.history[i] && this.history[i].name
            if (historyList[i] !== historyPart) {
                this.history.splice(i, this.history.length - i)
                this.history.push({ name: historyName, url: url })
                break
            }
            
            // Handles back button case.
            this.history.splice(historyList.length, this.history.length - historyList.length)
        }
    }
}