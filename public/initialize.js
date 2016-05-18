const navLinks = [
    {
        name: "resources",
        url: "/resources",
        load: loadResources
    },
    {
        name: "dashboards",
        url: "/dashboards",
        load: loadDashboards
    },
    {
        name: "help",
        url: "/help",
        load: loadHelp
    },
    {
        name: "billing",
        url: "/billing",
        load: loadBilling
    },
    {
        name: "notifications",
        url: "/notifications",
        load: loadNotifications
    },
    {
        name: "account",
        url: "/account",
        load: loadAccount
    }
]

// Initializes the nav.
const navElem = $("#nav")
const navItems = navLinks.map((page) => { return page.name })
const nav = new Nav(navElem, navItems)

// Initializes the breadcrumb.
const breadcrumbElem = $("#breadcrumb")
const breadcrumb = new Breadcrumb(breadcrumbElem)

// Initializes the page router.
const routes = {}
for (page of navLinks) {
    routes[page.url] = { load: page.load }
}

const router = new Router()

loadHome = (options) => {
    router.redirect("/resources", options)
}

// Registers routes.
//router.addRoute("/", loadHome) breaks regex
router.addRoute("/market", loadMarket)
router.addRoute("/market/product/:product", loadProduct)
router.addRoute("/resources", loadResources)
router.addRoute("/resources/website/:resource", loadWebsite)
router.addRoute("/resources/website/Info", loadInfo)
router.addRoute("/resources/website/publish", loadPublish)
router.addRoute("/resources/website/settings", loadSettings)
router.addRoute("/dashboards", loadDashboards)
router.addRoute("/help", loadHelp)
router.addRoute("/billing", loadBilling)
router.addRoute("/notifications", loadNotifications)
router.addRoute("/account", loadAccount)

// Listens on hash change.
window.addEventListener("hashchange", () => {
    router.loadPage()
    breadcrumb.load(router.history)
    nav.updateSelected(router.rootPage)
})

// Listens on page load.
// is this necessary?
window.addEventListener("load", () => {
    router.loadPage()
    breadcrumb.load(router.history)
    nav.updateSelected(router.rootPage)
})