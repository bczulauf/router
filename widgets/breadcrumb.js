class Breadcrumb {
    constructor(element, items) {
        this.element = element
        
        this.template = `<ul class="inline-list">${items.map(item => `<li class="breadcrumb-link"><a href="${item.url}">${item.name}</a></li>`).join("")}</ul>`
    }
    
    render () {
        return this.element.html(this.template)
    }
}