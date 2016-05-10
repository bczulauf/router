const loadApp = (resourceId) => {
    // Checks if website app is already loaded.
    if ($("#website").length > 0) {
        return
    }

    const page = $("#page")
    const menuItems = [{ name: "General Info", url: `/?id=${resourceId}`, replaceState: true }, { name: "Publish", url: `/publish/?id=${resourceId}`, replaceState: true }, { name: "Settings", url: `/settings/?id=${resourceId}`, replaceState: true }]
    const menu = new Menu(null, menuItems)
    const template = `<div id="website" class="flex-container">${menu.template}<div id="page-content"></div></div>`
    
    page.html(template)
}

const loadGeneralInfo = (options) => {
    const resourceId = options.query.id
    const pageContent = $("#page-content")
    const template = `This is some general info. ${resourceId.name}`
    
    loadApp(resourceId)
    pageContent.html(template)
}

const loadPublish = (options) => {
    const resourceId = options.query.id
    const pageContent = $("#page-content")
    const template = `This is the url we are publishing to ${resourceId.url}`

    loadApp(resourceId)
    pageContent.html(template)
}

const loadSettings = () => {
    const pageContent = $("#page-content")
    const template = `Here is some content.`

    loadApp(resourceId)
    pageContent.html(template)
}

const loadWebsite = (options) => {
    const resourceId = options.params
    
    loadApp(resourceId)
    
    getResourceById(resourceId).then((data) => {
        // By default loads general info.
        loadGeneralInfo()
    })
}