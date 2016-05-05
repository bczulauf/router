// Load functions for each route.
const loadHome = (options) => {
    return new Promise((resolve, reject) => {
        const template = `<div>home</div>`

        resolve(template)
    })
}

// const loadResource = (options) => {
//     const appOptions = { app: options.query.app, resourceId: options.query.id }
    
//     return new Promise((resolve, reject) => {
//         getApp(appOptions).then((template) => {
//             resolve(template)
//         })
//     })
// }

const loadResources = (options) => {
    return new Promise((resolve, reject) => {
        getResources().then((items) => {
            const template =
            `<button class="create-btn">Create new resource</button>
            <div id="filter"><input id="filter-input" type="text" placeholder="Filter" /></div>
            <ul class="inline-list list-header"><li class="cell-5">Name</li><li class="cell-3">Kind</li><li class="cell-2">Last Modified</li></ul>
            <ul class="block-list">${items.map(item => `<li class="row"><div class="cell-5"><a href="#/resources/${item.kind}:${item.name}?id=${item.id}">${item.name}</a></div><div class="cell-3">${item.kind}</div><div class="cell-2">${item.lastModified}</div></li>`).join("")}</ul>`

            resolve(template)
        })
    })
}

const loadDashboards = (options) => {
    return new Promise((resolve, reject) => {
        const template = `<div>Dashboards</div>`

        resolve(template)
    })
}

const loadHelp = (options) => {
    return new Promise(function(resolve, reject) {
        const template = `<div>Help</div>`

        resolve(template)
    })
}

const loadBilling = (options) => {
    return new Promise(function(resolve, reject) {
        // This should load powerbi charts
        const template = `<div>Billing</div>`

        resolve(template)
    })
}

const loadAccount = (options) => {
    return new Promise(function(resolve, reject) {
        const template = `<div>Account</div>`

        resolve(template)
    })
}