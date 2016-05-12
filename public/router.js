class Router {
    constructor (routes, options) {
        this.routes = routes
        this.breadcrumb = options && options.breadcrumb
        this.nav = options && options.nav
        
        // TODO: make sure initial routes are parameterized
        this.parameterLookup = {}
        
        // Listens on hash change.
        window.addEventListener("hashchange", () => {
            this.loadPage()
        })

        // Listens on page load.
        window.addEventListener("load", () => {
            this.loadPage()
        })
    }
    
    _getUrlObj (url) {
        var obj = {}
        
        const splitUrl = url.split("?")
        const path = splitUrl[0]
        const query = splitUrl[1]
        const parts = path.split("/")
        
        parts.forEach((part, index) => {
            // Checks to see if part is a known to be followed by a parameter.
            const ref = this.parameterLookup[part]
            
            if (ref) {
                const param = parts.splice(index + 1, 1)
                obj.params = param[0]
            }
        })

        // Todo: clean this up.
        obj.route = parts.join("/")
        //obj.route = path.replace( /:.*?\//g, "/" ).replace(/\/$/, "")
        
        obj.query = query && query.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]
        
        return obj
    }
    
    addRoute (path, loadFn) {
        const parts = path.split("/")
        const count = parts.length

        if (parts[parts.length - 1].indexOf(":") > -1) {
            this.parameterLookup[parts[parts.length - 2]] = parts[parts.length - 1].replace( /:/, "" )
            path = path.split(":")[0].replace(/\/$/, "")
        }
        
        this.routes[path] = { load: loadFn }
    }
    
    addRedirect (url) {
        window.history.replaceState("", redirectUrl, redirectUrl)
        
        this.loadPage()
    }
    
    // replaceState (event, data) {
    //     event.preventDefault()
    //     const target = event.target
    //     const href = $(target).attr("href")
    //     const element = data && data.element
        
    //     window.history.replaceState("", href, href)
        
    //     this.loadPage()
    // }
    
    loadPage () {
        const url = location.hash.slice(1) || "/"
        const friendlyUrl = this._getUrlObj(url)
        const route = this.routes[friendlyUrl.route]
        const parts = url.split("/")
        
        if (route.load) {
            route.load({ params: friendlyUrl.params, query: friendlyUrl.query })

            // Updates the breadcrumb
            var currentBreadcrumb
            
            const breadcrumbs = parts.splice(1, parts.length - 1).map((part) => {
                const name = part
                
                if (currentBreadcrumb) {
                    part = `${currentBreadcrumb}/${part}`
                } else {
                    part = `#/${part}` 
                }
                
                currentBreadcrumb = part
                
                return { url: part, name: name.split("?")[0] }
            })
            
            if (this.breadcrumb) {
                this.breadcrumb.update(breadcrumbs)
                this.breadcrumb.render()
            }
            
            if (this.nav) {
                this.nav.updateSelection(breadcrumbs[0].name)
            }
        }
    }
}