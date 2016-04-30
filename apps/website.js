// A hash to store our pages.
var pages = {}
var resource;

const loadGeneralInfo = () => {
    return new Promise((resolve, reject) => {
        const contentTemplate = `This is some general info. ${resource.name}`
        
        resolve(contentTemplate)
    })
}

const loadPublish = () => {
    return new Promise((resolve, reject) => {
        const contentTemplate = `So, you want to publish?`
        
        resolve(contentTemplate)
    })
}

const loadSettings = () => {
    return new Promise((resolve, reject) => {
        const contentTemplate = `Here are the settings you asked for.`
        
        resolve(contentTemplate)
    })
}

const getPageContent = (options) => {
    // OPtions needs to include resource data.
    const page = pages[options.path]
    
    return new Promise((resolve, reject) => {
        page.load(options).then((template) => {
            resolve(template)
        })
    })
}

const loadWebsite = (options) => {
    const resourceId = options.resourceId

    // Registers a route.
    const route = (path, loadFn) => {
        pages[path] = { load: loadFn }
    }
    
    // Prevents internal links from changing hash.
    $(".internal-link").on("click", (event) => {
        event.preventDefault()
        const target = event.target
        const url = $(target).attr("href")
        // get the query params from url to get the 
        
        window.history.replaceState("", url, url)
        getPageContent(url)
    })
    
    // window.on("popstate", () => {
    //     if (event.state === "replace") {
    //         getPageContent()
    //     }
    // })
    
    route("/generalInfo", loadGeneralInfo)
    route("/publish", loadPublish)
    route("/settings", loadSettings)
    
    const menuItems = [{ name: "General Info", url: "/info" }, { name: "Publish", url: "/publish" }, { name: "Settings", url: "/settings" }]
        
    // Creates menu template.
    const menuTemplate = `<ul id="menu" class="block-list">${menuItems.map(item => `<li><a class="internal-link" href="#/resources/resource:${options.params}/${item.url}">${item.name}</a></li>`).join("")}</ul>`
    
    return new Promise((resolve, reject) => {
        getResourceById(resourceId).then((data) => {
            // By default loads general info.
            resource = data
            loadGeneralInfo()
        }).then((contentTemplate) => {
            const template = `${menuTemplate}<div id="page-content">${contentTemplate}</div>`
            resolve(template)
        })
    })
}