//* database
class Users {
    constructor(name, email, password, age, money) {
        this.name = name
        this.email = email
        this.password = password
        this.age = age
        this.balance = 1000
        this.history = []
    }
}
const user = new Users("fadwa narjissi", "fadwa@gmail.com", "123456@" , 24);
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

//* changePassword function
const changePassword = () => {
    let email = prompt("Enter your email to change your password")
    if (database.find(e => e.email == email)){
        let newPassword = prompt("enter your new password")
        newPassword = verificationPassword(newPassword)
        console.log(newPassword);
    }else {
        alert("this email does not exist!")
        return;
    }
}

//* Services functions
const services = (existuser) => {
    while (true) {
        let menu = prompt("choose an action from these options: (logout, withdraw money, deposit money, take a loan, invest , history)").toLowerCase();
        if (menu === 'logout') {
            alert("You are logged out.");
            break;
        } else if (menu === 'withdraw money') {
            withdraw(existuser);
        }else if (menu === 'deposit money'){
            deposit(existuser)
        } else if (menu === 'take a loan') {
            loan(existuser)
        } else if (menu === 'history'){
            history(existuser)
        } else if (menu === 'invest'){
            invest(existuser)
        }
    }
};
const withdraw = (existuser) => {
    let amount = parseFloat(prompt("Enter the amount to withdraw:"));
    if (isNaN(amount) || amount <= 0) {
        alert("enter a valid amount greater than 0.");
        return;
    }
    if (amount <= existuser.balance) {
        existuser.balance -= amount;
        existuser.history.push(`Withdrawal of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
        alert(`Withdrawal of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
        console.log(`Withdrawal of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
    } else {
        alert("Insufficient balance.");
    }
};
const deposit = (existuser) => {
    let amount = parseFloat(prompt("how much would you like to deposit?"))
    if (isNaN(amount) || amount <= 0) {
        alert("enter a valid amount greater than 0.")
        return;
    }
    if (amount <= 1000 ) {
        existuser.balance += amount;
        existuser.history.push(`deposit of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
        alert(`You have deposited ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
        console.log(`Deposit of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
    } else {
        alert("Amount exceeds the allowed limit of 1000 dh.");
    }
}
const history =(existuser) => {
    if (existuser.history.length === 0) {
        alert("0 transaction.");
    } else {
        alert("Transaction history : " + existuser.history.join("\n"))
    }
}
const loan = (existuser) => {
    let maxLoan = (existuser.balance * 20) / 100 
    let amountLoan = parseFloat(prompt("how much would like to take as a loan?"))
    if (maxLoan >= amountLoan) {
        existuser.balance += amountLoan
        existuser.history.push(`Credit of ${amountLoan.toFixed(2)} dh.`)
        alert(`You take a credit of ${amountLoan.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`)
        console.log(`Credit of ${amountLoan.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`)
    } else {
        alert("Amount exceeds the allowed limit of loan.");
    }
    existuser.loan = {
        total: amountLoan,
        repaid: 0
    };
    
    
}
const invest = (existuser) => {
    let amount = parseFloat(prompt("Enter the amount to invest:"))

    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount greater than 0.");
        return;
    }
    existuser.balance += amount 
    existuser.history.push(`Investment of ${amount.toFixed(2)} dh.`)
    alert(`You have invested ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
    console.log(`Investment of ${amount.toFixed(2)} dh. New balance: ${existuser.balance.toFixed(2)} dh.`);
}

//* login function
const login = () => {
    //! Email
    let email = prompt('enter an email').trim().toLowerCase();
    let existuser = database.find(e => e.email === email)
    if (!existuser) {
        alert("this email does not exist!")
        return;
    }
    console.log(email);
    //! password
    let password = prompt("enter your password")
    if (password !== existuser.password) {
        alert('That password didn’t match')
    }else {
        alert ('login successful.')
        alert(`Welcome, ${user.name}. Your current balance is ${user.balance.toFixed(2)} dh.`);
        if (existuser.loan && existuser.loan.repaid < existuser.loan.total) {
            let loandraft =(existuser.balance * 10) / 100 
            if (existuser.loan.repaid + loandraft > existuser.loan.total) {
                loandraft = existuser.loan.total - existuser.loan.repaid;
            }
            existuser.balance -= loandraft
            existuser.loan.repaid += loandraft
            existuser.history.push(`Repayment of ${loandraft.toFixed(2)} dh from loan.`);
            alert(`Repayment of ${loandraft.toFixed(2)} dh from loan.`)
            if (existuser.loan.repaid >= existuser.loan.total) {
                alert("Loan fully repaid!");
                existuser.loan.total = 0
                existuser.loan.repaid =0
                console.log(existuser.loan);
                
            }
        }
        services(existuser)
        return true;
    }
}

let askuser = prompt("choose an action from these options: (sign up, login, change password)").toLowerCase()
while (askuser !== 'exit') {
    if (askuser == "sign up") {
        singup()
    } else if (askuser == "login") {
        login()
    } else if (askuser == "change password") {
        changePassword()
    } else {
        alert("try again.")
    }
    askuser = prompt("choose an action from these options: (sign up, login, change password)").toLowerCase();
}

