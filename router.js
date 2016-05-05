// A hash to store our routes.
var routes = {}

// Registers a route.
const route = (path, loadFn) => {
    routes[path] = { load: loadFn }
}

// Internal routes that should replace history state.
const replaceState = (event) => {
    event.preventDefault()
    const target = event.target
    const href = $(target).attr("href")
    
    window.history.replaceState("", href, href)
    
    router()
}

class FriendlyUrl {
    constructor (url) {
        this.url = url
        
        // Splits url between path and query.
        const pathQuery = url.split("?")
        const path = pathQuery[0]
        // Todo: clean this up.
        this.route = path.replace( /:.*?\//g, "/" ).replace( /:.*/, "" )
        
        const query = pathQuery[1]
        this.query = query && query.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]
        
        // Splits the path into parts.
        const parts = path.split("/")
        this.parts = parts
        
        const count = parts.length
        this.params = parts[count - 1].split(":")[1]
    }
}

const navArray = ["home", "resources", "dashboards", "help", "billing", "account"]
const nav = $("#nav")
const navTemplate = `<ul class="inline-list">${navArray.map(item => `<li id="${item}"><a href="#/${item}">${item}</a></li>`).join("")}</ul>`

nav.html(navTemplate)

const updateNavSelection = (selected) => {
    const selectedItem = `#${selected}`
    $(".selected-item").removeClass("selected-item")
    $(selectedItem).addClass("selected-item")
}

const breadcrumbElem = $("#breadcrumb")

const routeTo = (route) => {
    window.location.href = route;
}

// Routes.
route("/", loadHome)
route("/resources/website", loadWebsite)
route("/resources", loadResources)
route("/dashboards", loadDashboards)
route("/help", loadHelp)
route("/billing", loadBilling)
route("/account", loadAccount)

const page = $("#page")

const router = () => {
    const url = location.hash.slice(1) || "/"
    const friendlyUrl = new FriendlyUrl(url)
    const route = routes[friendlyUrl.route]
    const parts = friendlyUrl.parts

    if (route.load) {
        route.load({ params: friendlyUrl.params, query: friendlyUrl.query }).then((template) => {
            page.html(template)
        })

        // Creates the breadcrumb.
        const breadcrumbs = parts.splice(1, parts.length - 1).map(function(n){
            return { url: `#/${n}`, name: n }
        })
        
        const breadcrumb = new Breadcrumb(breadcrumbElem, breadcrumbs)
        breadcrumb.render()
        updateNavSelection(breadcrumbs[0].name)
    }
}

// Listens on hash change.
window.addEventListener("hashchange", router)

// Listens on page load.
window.addEventListener("load", router)