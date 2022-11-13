/* -------------------------------- Variables ------------------------------- */
const input = document.querySelector('input[type="file"]')
var currentUser = sessionStorage.getItem('userName')
var allUsers = JSON.parse(localStorage.getItem('allUsers')) || {}

const saveUsers = () => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers))
}
class User {
    constructor(email, name, lastname) {
        this.name = name
        this.lastname = lastname
        this.email = email
    }
}

/* ----------------------------- Foto de Perfil ----------------------------- */

var addImage = () => {
    var dataImage = localStorage.getItem(`${currentUser.email}`);
    bannerImg = document.getElementById('userImage');
    bannerImg.src = dataImage;
}

input.addEventListener('change', e => {
    saveImg()
}, false)
const saveImg = () => {
    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image()
        img.src = reader.result
        localStorage.setItem(`${currentUser.email}`, reader.result);
        addImage()
    }
    reader.readAsDataURL(input.files[0])
}


/* ------------------ Verificacion de existencia de usuario ----------------- */

if (allUsers[currentUser.toLowerCase()] == undefined) {
    currentUser = new User(currentUser.toLowerCase())
    document.getElementById('email').value = currentUser.email
} else {
    currentUser = allUsers[currentUser]
    document.getElementById('name').value = currentUser.name
    document.getElementById('lastname').value = currentUser.lastname
    document.getElementById('email').value = currentUser.email || currentUser
    document.getElementById('snd-name').value = currentUser.sndName || ''
    document.getElementById('snd-lastname').value = currentUser.sndLastname || ''
    document.getElementById('phone').value = currentUser.phone || ''
    addImage()
}

/* ---------------------------- Ingreso de datos ---------------------------- */

document.getElementById('save-user-data').addEventListener('click', (e) => {
    e.preventDefault()
    let form = document.getElementById('profile-data')
    document.querySelector('#profile-data>div').classList.add('was-validated')
    if (form.checkValidity()) {
        delete allUsers[currentUser.email]
        currentUser = new User(document.getElementById('email').value.toLowerCase())
        currentUser.name = document.getElementById('name').value
        currentUser.lastname = document.getElementById('lastname').value
        currentUser.sndName = document.getElementById('snd-name').value || undefined
        currentUser.sndLastname = document.getElementById('snd-lastname').value || undefined
        currentUser.phone = document.getElementById('phone').value || undefined
        allUsers[currentUser.email] = currentUser
        saveImg()
        saveUsers()
        sessionStorage.setItem('userName', currentUser.email)
        location.reload()
    }
})