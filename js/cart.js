/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
class Cart {
    #id
    #data
    #value
    constructor(id = 25801) {
        this.#id = id
        this.articles = {}
        this.#data = this.getData()
        this.container = document.getElementById('table__products-list')
        this.load = false
    }

    /* --------------------------------- Metodos -------------------------------- */

    async getData() {
        this.#data = await getJSONData(CART_INFO_URL + this.#id + '.json')
            .then(e => e.data)
    }

    async render() {
        await this.#data
        this.container.innerHTML = ''
        if (!this.load) {
            this.load = true
            for (let product of this.#data.articles) {
                newProduct(product)
                this.articles[product.id] = product
                this.container.innerHTML += product.body()
            }
            return
        }
        for (let product in this.articles){
            this.container.innerHTML += this.articles[product].body()
        }
    }

    onChangeCount = (productID) => {
        this.articles[productID].count = document.getElementById(`cant${productID}`).value
        this.render()
    }
}

/* -------------------- Modificacion del objeto producto -------------------- */
let newProduct = (product) => {
    product.body = () => {
        let html = `
        <tr class="product">
            <th class="d-none d-sm-block ">
                <img class="product__image" src="${product.image}">
            </th>
            <th>
                ${product.name}
            </th>
            <th>
            ${product.currency} ${product.unitCost}
            </th>
            <th class="product__cant">
                <input type="number" min="1" value="${product.count}" id="cant${product.id}" onchange="myCart.onChangeCount(${product.id})" class="form-control" autofocus>
            </th>
            <th>
                ${product.currency} ${product.unitCost * product.count}
            </th>
        </tr>
        `
        return html
    }
    return product
}

const myCart = new Cart()
myCart.render()