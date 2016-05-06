class Router {
    constructor (routes, options) {
        this.routes = routes
        this.breadcrumb = options && options.breadcrumb
        this.nav = options && options.nav
        
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
        
        // Splits url between path and query.
        const pathQuery = url.split("?")
        const path = pathQuery[0]
        // Todo: clean this up.
        obj.route = path.replace( /:.*?\//g, "/" ).replace( /:.*/, "" )
        
        const query = pathQuery[1]
        obj.query = query && query.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]
        
        // Splits the path into parts.
        const parts = path.split("/")
        obj.parts = parts
        
        const count = parts.length
        obj.params = parts[count - 1].split(":")[1]
        
        return obj
    }
    
    addRoute (path, loadFn) {
        this.routes[path] = { load: loadFn }
    }
    
    addRedirect (url) {
        window.history.replaceState("", redirectUrl, redirectUrl)
        
        this.loadPage()
    }
    
    replaceState (event, data) {
        event.preventDefault()
        const target = event.target
        const href = $(target).attr("href")
        const element = data && data.element
        
        window.history.replaceState("", href, href)
        
        this.loadPage()
    }
    
    loadPage () {
        const url = location.hash.slice(1) || "/"
        const friendlyUrl = this._getUrlObj(url)
        const route = this.routes[friendlyUrl.route]
        const parts = friendlyUrl.parts
        
        if (route.load) {
            route.load({ params: friendlyUrl.params, query: friendlyUrl.query })

            // Updates the breadcrumb
            const breadcrumbs = parts.splice(1, parts.length - 1).map((n) => {
                return { url: `#/${n}`, name: n }
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