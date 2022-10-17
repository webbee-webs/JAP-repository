const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

/* ---------------------------------- FETCH --------------------------------- */

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

/* -------------------------------- USER NAME ------------------------------- */

let navBar = document.getElementsByClassName('nav-item')
userName = `<div class="dropdown">
<button class="btn text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
${sessionStorage.getItem('userName')}
</button>
<ul class="dropdown-menu">
  <li><a class="dropdown-item" href="./my-profile.html">Mi Perfil</a></li>
  <li><a class="dropdown-item" href="./cart.html">Carrito</a></li>
  <li><a class="dropdown-item" href="./index.html" id="closeSession">Cerrar sesión</a></li>
</ul>
</div>`
navBar[navBar.length - 1].innerHTML = userName


/* -------------------------------------------------------------------------- */
/*                                PRODUCT INFO                                */
/* -------------------------------------------------------------------------- */

var productID = (id) => {
  console.log(id)
  localStorage.setItem('productID', id)
  window.location.href = "./product-info.html";
}

/* ------------------------------ CERRAR SESION ----------------------------- */

document.getElementById('closeSession').addEventListener('click', () => {
  sessionStorage.removeItem('userName')
})

/* --------------------------------- Carrito -------------------------------- */
class Cart {
  constructor() {
    this.data = {}
    this.container = document.getElementById('table__products-list')
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== 'undefined') {
      this.data = JSON.parse(localStorage.getItem('cart'))
    }
  }

  async addData (obj) {
    obj = await newProduct(obj)
    this.data[`item${obj.id}`] = obj
    localStorage.setItem('cart', JSON.stringify(this.data))
  }

  clearData() {
    this.data = {}
    localStorage.removeItem('cart')
  }
  getData() {
    this.data = JSON.parse(localStorage.getItem('cart'))
    for(let data in this.data){
      this.addData(this.data[data])
    }
  }
  async render() {
    this.container.innerHTML = ''
    for (let data in this.data) {
      this.addData(this.data[data])
      this.container.innerHTML += this.data[data].body()
    }
  }
}

var change = (id) =>{
  cart.data[`item${id}`].count = document.getElementById(`cant${id}`).value
  cart.render()
}

let newProduct = (product) => {
  product.body = ()=>{
    let html = `
    <tr class="product">
        <th class="d-none d-sm-block">
            <img class="product__image" src="${product.images[0]}">
        </th>
        <th>
            ${product.name}
        </th>
        <th>
        ${product.currency} ${product.cost}
        </th>
        <th>
            <input type="number" min="1" value="${product.count || 1}" id="cant${product.id}" onchange="change(${product.id})" class="form-control">
        </th>
        <th>
            ${product.currency} ${(product.count || 1) * product.cost}
        </th>
    </tr>
    `
    return html
  }
  return product
}

var cart = new Cart()
