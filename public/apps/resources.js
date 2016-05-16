const loadResources = (options) => {    
    getResources().then((items) => {
        const page = $("#page")
        const template =
        `<div class="one-column">
        <button class="create-btn">Create new resource</button>
        <div id="filter"><input id="filter-input" type="text" placeholder="Filter" /></div>
        <ul class="inline-list list-header"><li class="cell-5">Name</li><li class="cell-3">Kind</li><li class="cell-2">Last Modified</li></ul>
        <ul class="block-list">${items.map(item => `<li class="row"><div class="cell-5"><a href="#/resources/${item.kind}/${item.id}">${item.name}</a></div><div class="cell-3">${item.kind}</div><div class="cell-2">${item.lastModified}</div></li>`).join("")}</ul>
        </div>`
    
        page.html(template)
    })
}