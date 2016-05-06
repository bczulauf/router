// Todo: this shouldn't be global!!!!!!!!
var resource;

const loadGeneralInfo = () => {
    const pageContent = $("#page-content")
    const template = `This is some general info. ${resource.name}`
    
    pageContent.html(template)
}

const loadPublish = () => {
    const pageContent = $("#page-content")
    const template = `This is the url we are publishing to ${resource.url}`
    
    pageContent.html(template)
}

const loadSettings = () => {
    const pageContent = $("#page-content")
    const template = `Here is some content.`
    
    pageContent.html(template)
}

const loadWebsite = (options) => {
    const page = $("#page")
    const resourceId = options.query.id
    const menuItems = [{ name: "General Info", url: "/generalInfo", replaceState: true }, { name: "Publish", url: "/publish", replaceState: true }, { name: "Settings", url: "/settings", replaceState: true }]
    const menu = new Menu(null, menuItems)
    const template = `${menu.template}<div id="page-content"></div>`
    
    page.html(template)
    
    getResourceById(resourceId).then((data) => {
        // By default loads general info.
        resource = data
        loadGeneralInfo()
    })
}