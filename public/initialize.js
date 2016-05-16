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

const router = new Router(routes, { nav: nav, breadcrumb: breadcrumb })

loadHome = (options) => {
    router.redirect("/resources", options)
}

// Registers routes.
router.addRoute("/", loadHome)
router.addRoute("/resources/website/:resourceId", loadWebsite)
router.addRoute("/resources/website/generalInfo", loadGeneralInfo)
router.addRoute("/resources/website/publish", loadPublish)
router.addRoute("/resources/website/settings", loadSettings)

// Listens on hash change.
window.addEventListener("hashchange", () => {
    router.loadPage()
    breadcrumb.load(router.history)
    nav.updateSelected(router.rootPage)
})

// Listens on page load.
window.addEventListener("load", () => {
    router.loadPage()
    breadcrumb.load(router.history)
    nav.updateSelected(router.rootPage)
})