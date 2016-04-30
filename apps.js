// A hash to store our routes.
var apps = {}

// Registers an app.
const register = (name, loadFn) => {
    apps[name] = { load: loadFn }
}

register("website", loadWebsite)
//register("virtualMachine", loadVM)

const getApp = (options) => {
    const app = apps[options.app]
    
    return new Promise((resolve, reject) => {
        app.load(options).then((template) => {
            resolve(template)
        })
    })
}