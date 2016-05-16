class Breadcrumb {
    constructor(element) {
        this.element = element
    }
    
    load (items) {
        const template = 
        `<ul class="inline-list">
        ${items.map(item => `<li class="breadcrumb-link"><a href="${item.url}">${item.name}</a></li>`).join("")}
        </ul>`
        
        this.element.html(template)
    }
}