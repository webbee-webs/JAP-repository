var submit = ()=>{
    let user = document.getElementById('user')
    if(user.value==""){return}
    let pass = document.getElementById('pass')
    if(pass.value==""){return}
    window.location.href = "./home.html"
}