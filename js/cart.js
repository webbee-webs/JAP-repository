cart.render()
document.querySelector('.form__tipo').addEventListener('click', (e) => {
    let radBut = document.querySelectorAll('input[type="radio"][name="tipo-de-envio"]')
    for (button of radBut) {
        if (button.checked) {
            cart.envio = parseInt(button.value) / 100
        }
    }
    cart.render()
})

var payMethodsFunc = () => {
    let payMethods = document.querySelectorAll('input[name="pay-method"]')
    for (Method of payMethods) {
        let inputs = document.querySelectorAll(`#${Method.value}-form input`)
        for (input of inputs) {
            input.disabled = true
        }
        if (Method.checked) {
            cart.payMethod = Method.value
            let text = document.getElementById('forma-de-pago__text')
            text.classList.remove('text-danger')
            text.innerHTML = Method.dataset.name
            let inputs = document.querySelectorAll(`#${cart.payMethod}-form input`)
            for (input of inputs) {
                input.disabled = false
            }
        }
    }
}

document.getElementById('credit-card').addEventListener('click', ()=>payMethodsFunc())
document.getElementById('bank').addEventListener('click', ()=>payMethodsFunc())
document.getElementById('finalizar-compra').addEventListener('click',()=>{
    cart.validate()
})