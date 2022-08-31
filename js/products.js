var containerHTML = document.getElementById('container-products')
var getData = ()=>{getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
    .then(e => {
        var products = e.data.products;
        showProducts(products)
    })}


/* -------------------------------------------------------------------------- */
/*                               RENDER PRODUCTS                              */
/* -------------------------------------------------------------------------- */

var showProducts = (list) => {
    containerHTML.innerHTML = ''
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

/* -------------------------------------------------------------------------- */
/*                                   FILTRO                                   */
/* -------------------------------------------------------------------------- */

var filter = () => {
    let min = document.getElementById('rangeFilterCountMin').value
    let max = document.getElementById('rangeFilterCountMax').value
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
        .then(e => {
            var products = e.data.products;

            let minList = products.filter((val) => {
                if (min == '') {
                    return true
                }
                if (val.cost >= min) {
                    return true
                }
                return false
            })

            let list = minList.filter((val) => {
                if (max == '') {
                    return true
                }
                if (val.cost <= max) {
                    return true
                }
                return false
            })

            showProducts(list)

        })
}

var clearFilter = () => {
    document.getElementById('rangeFilterCountMin').value = ""
    document.getElementById('rangeFilterCountMax').value = ""
    getData()
}

document.getElementById('rangeFilterCount').addEventListener('click', () => filter())
document.getElementById('clearRangeFilter').addEventListener('click', () => clearFilter())
getData()