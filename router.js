// A hash to store our routes.
var routes = {}

// Registers a route.
const route = (path, loadFn) => {
    routes[path] = { load: loadFn }
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

const breadcrumb = $("#breadcrumb")

const updateBreadcrumb = (items) => {
    const template = `<ul class="inline-list">${items.map(item => `<li class="breadcrumb-link"><a href="${item.url}">${item.name}</a></li>`).join("")}</ul>`

    breadcrumb.html(template)
}

const routeTo = (route) => {
    window.location.href = route;
}

// Routes.
route("/", loadHome)
route("/resources/resource", loadResource)
route("/resources", loadResources)
route("/dashboards", loadDashboards)
route("/help", loadHelp)
route("/billing", loadBilling)
route("/account", loadAccount)

const page = $("#page")

const router = (event) => {
    const url = location.hash.slice(1) || "/"
    const parts = url.split("?")
    const path = parts[0];
    var cleanPath = path.replace( /:.*?\//g, "/" )
    // Todo: figure out how to clean this up.
    cleanPath = path.replace( /:.*/, "" )

    // Splits out the query and params.
    const pathArray = path.split("/");
    const pathCount = pathArray.length;
    const route = routes[cleanPath]
    const params = pathArray[pathCount - 1].split(":")[1]
    
    // Splits out the query string.
    const search = parts[1];
    const query = search && search.split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0]
    const pageData = {
        query: query,
        params: params
    }

    if (route.load) {
        route.load(pageData).then((template) => {
            page.html(template)
        })

        // Renders the breadcrumb.
        const breadcrumbs = pathArray.splice(1, pathCount - 1).map(function(n){
            return {
                url: `#/${n}`,
                name: n
            }
        })
        updateBreadcrumb(breadcrumbs)
        updateNavSelection(breadcrumbs[0].name)
    }
}

// Listens on hash change.
window.addEventListener("hashchange", router)

// Listens on page load.
window.addEventListener("load", router)