//* database
class Users {
    constructor(name, email, password, age, money) {
        this.name = name
        this.email = email
        this.password = password
        this.age = age
        this.money = 1000
    }
}
const user = new Users("full name", "email@gmail.com", "123456@" , 24);
database = [user]
//* verificatin functions
const verificationName = (name) => {
    while (name.replace(/\s/g, '').length < 5 || /[0-9@#\-+*/]/.test(name)) {
        name = prompt("Enter a valid name (more than 5 characters, without numbers, @ , or similar special characters)  :").trim();
    }
    return 1
};
const verificationEmail = (email) => {
    while (email.length < 10 || !email.includes('@') || database.some(e => e.email === email) || /[#\-+*/]/.test(email)) {
        email = prompt("Enter a valid email (more than 10 characters, contain exactly one @ symbol. and unique) :").trim().toLowerCase();
    }
    return email;
};
const verificatinAge = (age) => {
    while (age == 0 || age.length > 2 || /\s/.test(age) || !/^\d+$/.test(age)) {
        age = prompt("Please enter a valid age (No spaces, Only digits are allowed, Age must be 1 or 2 digits long.")
    }
    return age ;
}
const verificationPassword = (password) => {
    while (password.length < 7 || !/[#@\-+*/]/.test(password) || /\s/.test(password)) {
        password = prompt("Enter a valid password (without spaces in the middle, at least one special character from the set: [@ , # , - , + , * , / ], at least 7 characters.) :");
    }
    return password;
};
const confirmationpassword = (confirmpassword , password) => {
    if (password !== confirmpassword) {
        alert(`That password didn’t match . For your security, you’ll be blocked`);
    }else {
        alert(`Password confirmed successfully!`)
    }
    
}
//* Signup function
const singup = () => {
    //! Name
    let name = prompt('enter a name').trim();
    verificationName(name)
    name = name.split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(' ');
    console.log(name);
    //! Email
    let email = prompt('enter an email').trim().toLowerCase();
    email = verificationEmail(email)
    console.log(email);
    //! Age
    let age = prompt("How old are you?").trim()
    age = verificatinAge(age)
    console.log(age);
    //! Password
    let password = prompt("enter a password")
    password = verificationPassword(password)
    console.log(password);
    //! Confirmpassword
    let confirmpassword = prompt("confirm your password")
    confirmpassword = confirmationpassword(confirmpassword , password)
    let newuser = new Users(name , email , password , Number(age) );
    database.push(newuser)
    console.table(database);
}

//* login function
const login = () => {
    //! Email
    let email = prompt('enter an email').trim().toLowerCase();
    let exist = database.find(e => e.email === email)
    if (!exist) {
        alert("this email does not exist!")
        return;
    }
    console.log(email);
    //! password
    let password = prompt("enter your password")
    if (password !== exist.password) {
        alert('That password didn’t match')
    }else {
        alert ('login successful.')
    }
}
let askuser = prompt("choose an action from these options: (sign up, login, change password)").toLowerCase()
if (askuser == "sign up") {
    singup()
}else if (askuser == "login") {
    login()
}
