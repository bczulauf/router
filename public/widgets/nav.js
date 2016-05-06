class Nav {
    constructor (element, items) {
        this.element = element
        this.template = `<ul class="inline-list">${items.map(item => `<li id="${item}"><a href="#/${item}">${item}</a></li>`).join("")}</ul>`
    }
    
    updateSelection (selected) {
        $(".selected-item").removeClass("selected-item")
        $(`#${selected}`).addClass("selected-item")
    }
    
    render () {
        this.element.html(this.template)
    }
}