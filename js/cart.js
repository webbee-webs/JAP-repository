/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
// class Carting {
//     #id
//     #data
//     #value
//     constructor(id = 25801) {
//         this.#id = id
//         this.articles = {}
//         this.#data = this.getData()
//         this.container = document.getElementById('table__products-list')
//         this.load = false
//     }

//     /* --------------------------------- Metodos -------------------------------- */

//     async getData() {
//         this.#data = await getJSONData(CART_INFO_URL + this.#id + '.json')
//             .then(e => e.data)
//     }

//     async render() {
//         await this.#data
//         this.container.innerHTML = ''
//         if (!this.load) {
//             this.load = true
//             for (let product of this.#data.articles) {
//                 newProduct(product)
//                 this.articles[product.id] = product
//                 this.container.innerHTML += product.body()
//             }
//             return
//         }
//         for (let product in this.articles){
//             this.container.innerHTML += this.articles[product].body()
//         }
//     }

//     onChangeCount = (productID) => {
//         this.articles[productID].count = document.getElementById(`cant${productID}`).value
//         this.render()
//     }
// }

/* -------------------- Modificacion del objeto producto -------------------- */


// const myCart = new Carting()
cart.render()