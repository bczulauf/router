// Load functions for each route.
const loadHome = (options) => {
    return new Promise(function(resolve, reject) {
        const template = `<div>home</div>`

        resolve(template)
    })
}

const loadResource = (options) => {
    return new Promise(function(resolve, reject) {
        getResourceById(options.query.id).then((item) => {
            // Construct link but on click i do event.preventDefault
            // I then update the history with history.replaceState(clickedUrl)
            // This should prevent a hashchange so no new breadcrumb
            // then i make a git request for whatever data i need 
            const template =
            `<ul class="block-list">${item.menuItems.map(item => `<li><a href="#/resources/resource:${options.params}?id=${options.query.id}&&selected=${item.name}">${item.name}</a></li>`).join("")}</ul>
            <div class="page-content"></div>`

            resolve(template)
        })
    })
}

const loadResources = (options) => {
    return new Promise(function(resolve, reject) {
        getResources().then((items) => {
            const template =
            `<button class="create-btn">Create new resource</button>
            <div id="filter"><input id="filter-input" type="text" placeholder="Filter" /></div>
            <ul class="inline-list list-header"><li class="cell-5">Name</li><li class="cell-3">Kind</li><li class="cell-2">Last Modified</li></ul>
            <ul class="block-list">${items.map(item => `<li class="row"><div class="cell-5"><a href="#/resources/resource:${item.name}?id=${item.id}&&selected=generalInfo">${item.name}</a></div><div class="cell-3">${item.kind}</div><div class="cell-2">${item.lastModified}</div></li>`).join("")}</ul>`

            resolve(template)
        })
    })
}

const loadDashboards = (options) => {
    return new Promise(function(resolve, reject) {
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