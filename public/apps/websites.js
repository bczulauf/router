const loadApp = (options) => {
    const resourceId = options.query.id
    const params = options.params

    // Checks if website app is already loaded.
    if ($("#website").length === 0) {
        const page = $("#page")
        const menuItems = [{ name: "General Info", url: `#/resources/website/${params}/?id=${resourceId}` }, { name: "Publish", url: `#/resources/website/${params}/publish/?id=${resourceId}` }, { name: "Settings", url: `#/resources/website/${params}/settings/?id=${resourceId}` }]
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

const loadInfo = (options) => {
    loadApp(options).then((data) => {
        const pageContent = $("#page-content")
        const template = `This is some general info for ${data.name}`
        pageContent.html(template)    
    })
}

const loadPublish = (options) => {
    loadApp(options).then((data) => {
        const pageContent = $("#page-content")
        const template = `This is the url we are publishing to ${data.url}`
        pageContent.html(template)  
    })
}

const loadSettings = (options) => {
    loadApp(options).then((data) => {
        const pageContent = $("#page-content")
        const template = `Here is the ip ${data.ip}`
        pageContent.html(template)
    })
}

const loadWebsite = (options) => {
    loadApp(options).then((data) => {
        const pageContent = $("#page-content")
        const template = `This is some general info for ${data.name}`
        pageContent.html(template)    
    })
}