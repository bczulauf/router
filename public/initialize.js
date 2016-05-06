const pages = [
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
const navItems = pages.map((page) => { return page.name })
const nav = new Nav(navElem, navItems)
nav.render()

// Initializes the breadcrumb.
const breadcrumbElem = $("#breadcrumb")
const breadcrumb = new Breadcrumb(breadcrumbElem, [])
breadcrumb.render()

// Initializes the page router.
const routes = {}
for (page of pages) {
    routes[page.url] = { load: page.load }
}

const router = new Router(routes, { nav: nav, breadcrumb: breadcrumb })

// Registers routes.
router.addRoute("/resources/website", loadWebsite)
router.addRoute("/resources/website/generalInfo", loadGeneralInfo)
router.addRoute("/resources/website/publish", loadPublish)
router.addRoute("/resources/website/settings", loadSettings)