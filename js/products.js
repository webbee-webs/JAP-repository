var containerHTML = document.getElementById('container-products')
var allData = []
var getData = () => {
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.catID}.json`)
        .then(e => {
            allData = e.data.products;
            renderProducts(allData)
        })
}


/* -------------------------------------------------------------------------- */
/*                          RENDERIZADO DE PRODUCTOS                          */
/* -------------------------------------------------------------------------- */

var renderProducts = (list) => {
    containerHTML.innerHTML = ``
    for (product of list) {
        let card = `
        <div onclick="productID(${product.id})" class="card m-2 cursor-active" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name} </br> ${product.currency} ${product.cost}</h5>
            <p class="card-text">${product.description}</p>
            <p class="fw-light">${product.soldCount} vendidos</p>
        </div>
        </div>
        `
        containerHTML.innerHTML += card
    }
}

/* -------------------------------------------------------------------------- */
/*                                   FILTRO                                   */
/* -------------------------------------------------------------------------- */

var filter = () => {
    let min = document.getElementById('rangeFilterCountMin').value
    let max = document.getElementById('rangeFilterCountMax').value
    var products = allData

    let minList = products.filter((val) => {
        if (val.cost >= min || min == '') {
            return true
        }
        return false
    })

    allData = minList.filter((val) => {
        if (val.cost <= max || max == '') {
            return true
        }
        return false
    })
    renderProducts(allData)
}

/* -------------------------------------------------------------------------- */
/*                               Limpiar Filtro                               */
/* -------------------------------------------------------------------------- */

var clearFilter = () => {
    document.getElementById('rangeFilterCountMin').value = ""
    document.getElementById('rangeFilterCountMax').value = ""
    getData()
}

/* -------------------------------------------------------------------------- */
/*                                   ORDENAR                                  */
/* -------------------------------------------------------------------------- */

function sortProducts(type, array) {
    let result = [];
    if (type == 'costDes') {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);
            return bCount - aCount
        })
    } else if (type == 'costAsc') {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);
            return aCount - bCount
        })
    } else {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            return bCount - aCount
        })
    }
    renderProducts(result)
}

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

let search = (data = document.getElementById('searchInput').value) => {
    data = data.toLowerCase()
    if(data== ''){
        return
    }
    let result = allData.filter((foo)=>{
        if (foo.description.toLowerCase().includes(data) || foo.name.toLowerCase().includes(data)){
            console.log(foo)
            return foo
        }
    })
    renderProducts(result)
}


/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

document.getElementById('rangeFilterCount').addEventListener('click', () => filter())
document.getElementById('clearRangeFilter').addEventListener('click', () => clearFilter())
document.getElementById('sortCostDes').addEventListener('click', () => sortProducts('costDes', allData))
document.getElementById('sortCostAsc').addEventListener('click', () => sortProducts('costAsc', allData))
document.getElementById('sortSoldCount').addEventListener('click', () => sortProducts('change', allData))
document.getElementById('searchBtn').addEventListener('click', () => {
    search()
    document.getElementById('searchInput').addEventListener('input',(e)=>search(e.target.value))
})

getData()