/* -------------------------------------------------------------------------- */
/*                              BOTON DE INGRESO                              */
/* -------------------------------------------------------------------------- */

var submit = () => {
    var loginCorrect = true
    sessionStorage.setItem('userName', 'null')
    let user = document.getElementById('user')
    let pass = document.getElementById('pass')
    user.classList.remove('is-invalid')
    pass.classList.remove('is-invalid')

    /* -------------------- Validacion del nombre de usuario -------------------- */
    if (user.value == "") {
        user.classList.add('is-invalid')
        user.placeholder = "Campo obligatorio"
        loginCorrect = false
    }
    /* ------------------------ Validacion de contraseña ------------------------ */
    if (pass.value == "") {
        pass.classList.add('is-invalid')
        pass.placeholder = "Campo obligatorio"
        loginCorrect = false
    }
    /* ------------------------------- Redireccion ------------------------------ */
    if (loginCorrect) {
        sessionStorage.setItem('userName', user.value)
        window.location.href = "./home.html"
    }
}

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