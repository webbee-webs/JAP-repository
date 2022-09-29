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

document.getElementById('closeSession').addEventListener('click', ()=>{
  sessionStorage.removeItem('userName')
})

