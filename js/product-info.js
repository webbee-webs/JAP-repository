getJSONData(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productID')}.json`)
    .then(e => showInfo(e.data))

const showInfo = (data) => {
    var container = document.getElementById('productInfo')
    container.innerHTML = `
    <a href='/products.html'>Regresar</a>
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
    <div id='galeryOfImages'></div>
    `
    let galery = document.getElementById('galeryOfImages')
    for (image of data.images) {
        galery.innerHTML += `<img src="${image}" class="img-thumbnail">`
    }
}

/* -------------------------------------------------------------------------- */
/*                                 COMENTARIOS                                */
/* -------------------------------------------------------------------------- */

getJSONData(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productID')}.json`)
    .then(e => showComments(e.data))

const showComments = (data) => {
    var commentsContainer = document.querySelector('ol.list-group')
    // El if quita el mensaje de que no hay comentarios
    if(data.length > 0){
        commentsContainer.innerHTML = ''
    }
    for (comment of data) {
        commentsContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${comment.user} <span class="fw-normal">${comment.dateTime}</span></div>
                    ${comment.description}
                </div>
            <div>
                ${
                    stars(comment.score)
                }
            </div>
        </li>
        `
    }
}

/* -------------------------------------------------------------------------- */
/*                                    STARS                                   */
/* -------------------------------------------------------------------------- */

const stars = (stars)=>{
    CommStars = ''
    for (e=5; e>0; e--){
        if(stars > 0 ){
            CommStars += `
            <span class="fa fa-star checked"></span>
            `
        }else{
            CommStars += `
            <span class="fa fa-star "></span>
            `
        }
        stars--
    }
    return CommStars
}