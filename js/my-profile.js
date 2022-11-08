const cl = (foo)=>console.log(foo);
var currentUser = sessionStorage.getItem('userName')
var allUsers = JSON.parse(localStorage.getItem('allUsers')) || {}
const saveUsers = ()=>{
    localStorage.setItem(JSON.stringify(allUsers))
} 
class User {
    constructor(name, lastname, email){
        this.name = name
        this.lastname = lastname
        this.email = email
    }
}

if(allUsers[currentUser] == undefined){
    currentUser = new User()
}

