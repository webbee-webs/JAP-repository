var dataProduct = {}
getJSONData(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productID')}.json`)
    .then(e => {
        dataProduct = e.data
        showInfo(e.data)
    })

const showInfo = (data) => {
    var container = document.getElementById('productInfo')
    container.innerHTML = `
    <a href='./products.html'>Regresar</a>
    <a href="./cart.html" class="btn btn-primary ml-3" onclick="cart.addData(dataProduct)">Comprar</a>
<h2 class="bold mt-4">${data.name}</h2>
<hr>
<h3>Precio</h3>
<p class="fs-5">${data.currency + ' ' + data.cost}</p>
<h3>Descripción</h3>
<p class="fs-5">${data.description}</p>
<h3>Categoría</h3>
<p class="fs-5">${data.category}</p>
<h3>Cantidad de vendidos</h3>
<p class="fs-5">${data.soldCount}</p>

<h3>Imágenes ilustrativas</h3>

<div id="carouselExampleIndicators" style="width: 50vw;" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators" id="carouselIndicators">
  </div>
  <div class="carousel-inner" id="galeryOfImages">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `
    /* ---- Esta parte agrega el html necesario para que funcione cada imagen del slider --- */
    let indicators = document.getElementById('carouselIndicators')
    let galery = document.getElementById('galeryOfImages')
    let counterImg = 0

    for (image of data.images) {
        galery.innerHTML += `<div class="carousel-item ${isActive(counterImg)
            }">
        <img src="${image}" class="d-block w-100" alt="...">
        </div>`
        indicators.innerHTML += `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${counterImg}" aria-label="Slide ${counterImg} class="${isActive(counterImg)
            }" ${isActive(counterImg, true)}></button>
        `
        counterImg++
    }
    showRelatedProducts(data.relatedProducts)
}

const isActive = (count, btn) => {
    if (btn == true && count == 0) {
        return ('class="active" aria-current="true"')
    }
    if (count == 0) {
        return ('active')
    }
}

/* -------------------------------------------------------------------------- */
/*                                 COMENTARIOS                                */
/* -------------------------------------------------------------------------- */

getJSONData(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productID')}.json`)
    .then(e => {
        comments = e.data
        showComments(e.data)
    })

const showComments = (data) => {
    var commentsContainer = document.querySelector('ol.list-group')
    commentsContainer.innerHTML = ''
    // El if quita el mensaje de que no hay comentarios
    if (data.length < 1) {
        commentsContainer.innerHTML = '<h4 class="text-secondary border border-secondary p-3 ">Upss... Parece que no hay comentarios</h4>'
    }
    for (comment of data) {
        commentsContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center align-items-md-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${comment.user} <span class="fw-normal">${comment.dateTime}</span></div>
                    ${comment.description}
                </div>
            <div class="d-flex">
                ${stars(comment.score)
            }
            </div>
        </li>
        `
    }
}

/* -------------------------------------------------------------------------- */
/*                                    STARS                                   */
/* -------------------------------------------------------------------------- */

const stars = (stars) => {
    CommStars = ''
    for (e = 5; e > 0; e--) {
        if (stars > 0) {
            CommStars += `
            <span class="fa fa-star checked"></span>
            `
        } else {
            CommStars += `
            <span class="fa fa-star "></span>
            `
        }
        stars--
    }
    return CommStars
}

/* -------------------------------------------------------------------------- */
/*                           Productos Relacionados                           */
/* -------------------------------------------------------------------------- */

const showRelatedProducts = (products) => {
    let container = document.getElementById('relatedProducts')
    for (product of products) {
        let card = `
        <div onclick="productID(${product.id})" class="card m-2 cursor-active" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name} </br> ${product.currency} ${product.cost}</h5>
        </div>
        </div>`
        container.innerHTML += card
    }
}
/* -------------------------------------------------------------------------- */
/*                              Enviar comentario                             */
/* -------------------------------------------------------------------------- */

document.getElementById('send-comment-btn').addEventListener('click', (e) => {
    let today = new Date()
    let stars = 0
    let comment = document.getElementById('floatingTextarea')
    for (input of document.querySelectorAll('p.comment__stars input')) {
        if (input.checked) {
            stars = input.value
        }
    }
    e.preventDefault()
    comments.unshift({
        user: sessionStorage.getItem('userName'),
        dateTime: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
        description: comment.value,
        score: stars || 1
    })
    showComments(comments)
    comment.innerHTML = ''
})