// This should be a promise!!!!!!!!!!!!!!
const loadApp = (resourceId) => {
    // Checks if website app is already loaded.
    if ($("#website").length === 0) {
        const page = $("#page")
        const menuItems = [{ name: "General Info", url: `/?id=${resourceId}` }, { name: "Publish", url: `/publish/?id=${resourceId}` }, { name: "Settings", url: `/settings/?id=${resourceId}` }]
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
    
    loadApp(resourceId).then((data) => {
        const pageContent = $("#page-content")
        const template = `This is some general info for ${data.name}`
        pageContent.html(template)    
    })
}

const loadPublish = (options) => {
    const resourceId = options.query.id

    loadApp(resourceId).then((data) => {
        const pageContent = $("#page-content")
        const template = `This is the url we are publishing to ${data.url}`
        pageContent.html(template)  
    })
}

const loadSettings = (options) => {
    const resourceId = options.query.id

    loadApp(resourceId).then((data) => {
        const pageContent = $("#page-content")
        const template = `Here is the ip ${data.ip}`
        pageContent.html(template)
    })
}

const loadWebsite = (options) => {
    const resourceId = options.query.id
    
    loadApp(resourceId)
}