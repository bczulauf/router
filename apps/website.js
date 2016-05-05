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

const loadWebsite = (options) => {
    // Registers routes.
    route("resources/website/generalInfo", loadGeneralInfo)
    route("resources/website/publish", loadPublish)
    route("resources/website/settings", loadSettings)
    
    const resourceId = options.query.id
    const menuItems = [{ name: "General Info", url: "/generalInfo", replaceState: true }, { name: "Publish", url: "/publish", replaceState: true }, { name: "Settings", url: "/settings", replaceState: true }]
    
    return new Promise((resolve, reject) => {
        getResourceById(resourceId).then((data) => {
            // By default loads general info.
            resource = data
            return loadGeneralInfo()
        }).then((contentTemplate) => {
            const menu = new Menu(menuItems)
            const template = `${menu.render()}<div id="page-content">${contentTemplate}</div>`
            resolve(template)
        })
    })
}