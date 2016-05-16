class Menu {
    constructor (element, items) {
        this.template = 
        `<ul id="menu" class="block-list">
        ${items.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join("")}</ul>`
    }

    render () {
        this.element.html(this.template)
    }
}