// This should be a promise!!!!!!!!!!!!!!
const loadApp = (resourceId) => {
    // Checks if website app is already loaded.
    if ($("#website").length === 0) {
        const page = $("#page")
        const menuItems = [{ name: "General Info", url: `/?id=${resourceId}`, replaceState: true }, { name: "Publish", url: `/publish/?id=${resourceId}`, replaceState: true }, { name: "Settings", url: `/settings/?id=${resourceId}`, replaceState: true }]
        const menu = new Menu(null, menuItems)
        const template = `<div id="website" class="flex-container">${menu.template}<div id="page-content"></div></div>`
        
        page.html(template)
    }
    
    return new Promise(function(resolve, reject) {
        getResourceById(resourceId).then((data) => {
            resolve(data)
        })
    })
}

const loadGeneralInfo = (options) => {
    const resourceId = options.query.id
    const pageContent = $("#page-content")
    const template = `This is some general info. ${resourceId.name}`
    
    loadApp(resourceId).then((data) => {
        pageContent.html(template)    
    })
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
}