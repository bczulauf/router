const loadProduct = () => {
    getProduct().then((item) => {
        const page = $("#page")
        const template = `<div>This is the product.</div>`

        page.html(template)
    })
}

const loadMarket = () => {
    getResourceTypes().then((items) => {
        const page = $("#page")
        const template = 
        `<div class="one-column">
        <ul class="inline-list">${items.map(item => `<li class="product"><div><a href="#/market/product/${item.name}">${item.name}</a></div></li>`).join("")}</ul>
        </div>`

        page.html(template)
    })
}