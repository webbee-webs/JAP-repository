var containerHTML = document.getElementById('container-products')
var listado = getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
    .then(e => loadProducts(e.data.products))

var loadProducts = (list) => {
    for (product of list) {
        let card = `
        <div class="card m-2" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name} </br> ${product.currency} ${product.cost}</h5>
            <p class="card-text">${product.description}</p>
            <p class="fw-light">${product.soldCount} vendidos</p>
        </div>
        </div>`
        containerHTML.innerHTML += card
    }
}