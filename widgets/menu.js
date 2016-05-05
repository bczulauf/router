class Menu {
    constructor (items) {
        const url = location.hash.slice(1) || "/"
        const pathQuery = url.split("?")
        const path = pathQuery[0]
        
        this.items = items
        this.template = 
        `<ul id="menu" class="block-list">
        ${items.map(item => `<li><a href="#${path}${item.url}" ${this.addHandler(item.replaceState)}>${item.name}</a></li>`).join("")}</ul>`
    }
    
    addHandler (replaceState) {
        return replaceState ? `onclick="replaceState(event)"` : ""
    }
    
    render () {
        return this.template
    }
}