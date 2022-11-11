/* -------------------------------------------------------------------------- */
/*                              BOTON DE INGRESO                              */
/* -------------------------------------------------------------------------- */

document.getElementById('submitButton').addEventListener('click', e => {
    e.preventDefault()
    sessionStorage.setItem('userName', 'null')
    let form = document.getElementById('login')
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        sessionStorage.setItem('userName', user.value.toLowerCase())
        window.location.href = "./home.html"
    }
})

/* -------------------------------------------------------------------------- */
/*                             LOG IN WITH GOOGLE                             */
/* -------------------------------------------------------------------------- */

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    window.location.href = "./home.html"
}

var loginGoogle = () => {
    setTimeout(() => {
        window.location.href = "./home.html"
    }, 4000)
}