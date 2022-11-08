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
    this.subtotal = 0
    this.envio = 0
    this.container = document.getElementById('table__products-list')
    this.allContainers = [document.querySelector('#costos__subtotal'), document.querySelector('#costos__envio'), document.querySelector('#costos__total')]
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== 'undefined') {
      this.data = JSON.parse(localStorage.getItem('cart'))
    }
  }

  async addData(obj) {
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
    for (let data in this.data) {
      this.addData(this.data[data])
    }
  }
  async render() {
    this.payMethod = undefined
    this.subtotal = 0
    this.container.innerHTML = ''
    for (let data in this.data) {
      this.addData(this.data[data])
      this.container.innerHTML += this.data[data].body()
      /* --------------------------------- costos --------------------------------- */
      let itemCost = this.data[data].currency == 'UYU' ? (this.data[data].cost * (this.data[data].count || 1)) / 40 : this.data[data].cost * (this.data[data].count || 1);
      this.subtotal += itemCost
      this.allContainers[0].innerHTML = 'U$D ' + this.subtotal.toFixed(2)
      console.log(this.envio)
      this.allContainers[1].innerHTML = 'U$D ' + (this.subtotal * this.envio).toFixed(2)
      this.total = this.subtotal * this.envio + this.subtotal
      this.allContainers[2].innerHTML = 'U$D ' + this.total.toFixed(2)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                Validaciones                                */
  /* -------------------------------------------------------------------------- */
  validate() {
    debugger
    let alertAllOK = document.getElementById('compraExitosa')
    let isOk = true
    let alerts = document.querySelectorAll('.alert')
    for (let alertDiv of alerts) {
      alertDiv.classList.add('d-none')
    }

    /* ---------------------------- cant de productos --------------------------- */
    for (let item in this.data) {
      if (this.data[item].count == 0) {
        document.querySelector('.alert#cant-0').classList.remove('d-none')
        isOk = false
      }
    }

    /* ------------------------------- direcciones ------------------------------ */

    let inputsDir = document.querySelectorAll('.form__direccion input')
    for (let input of inputsDir) {
      input.classList.remove('is-invalid')
      if (input.value == '') {
        input.classList.add('is-invalid')
        isOk = false
      }
    }
    /* ---------------------------------- envio --------------------------------- */
    document.querySelector('#alert-envio-feedback').classList.add('d-none')
    if (cart.envio == 0) {
      document.querySelector('#alert-envio-feedback').classList.remove('d-none')
      isOk = false
    }

    let inputs = document.querySelectorAll(`#${cart.payMethod}-form input`)
    let text = document.getElementById('forma-de-pago__text')
    for (input of inputs) {
      input.classList.remove('is-invalid')
      text.classList.remove('text-danger')
      text.classList.add('text-success')
      text.innerHTML = Method.dataset.name
      if (input.value == '') {
        text.classList.remove('text-success')
        text.classList.add('text-danger')
        text.innerHTML = 'Llena todos los campos'
        input.classList.add('is-invalid')
        isOk = false
      }
    }

    payMethodsFunc()
    if (this.payMethod == undefined) {
      isOk = false
    }
    console.log(isOk)

    if (isOk) {
      alertAllOK.classList.remove('d-none')
      setTimeout(() => {
        isOk = true
        alertAllOK.classList.add('d-none')
      }, 3000)
    }
  }


}

/* -------------------------- Modificar el producto ------------------------- */
var change = (id) => {
  cart.data[`item${id}`].count = document.getElementById(`cant${id}`).value
  console.log(cart.data[`item${id}`].count)
  cart.render()
}


let newProduct = (product) => {
  product.body = () => {
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
