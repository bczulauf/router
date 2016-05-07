class Menu {
    constructor (element, items) {
        const url = location.hash.slice(1) || "/"
        const pathQuery = url.split("?")
        const path = pathQuery[0]
        
        this.items = items
        this.template = 
        `<ul id="menu" class="block-list">
        ${items.map(item => `<li><a href="#${path}${item.url}">${item.name}</a></li>`).join("")}</ul>`
    }
    
    addHandler (replaceState) {
        return replaceState ? `onclick="router.replaceState(event)"` : ""
    }
    
    render () {
        this.element.html(this.template)
    }
}