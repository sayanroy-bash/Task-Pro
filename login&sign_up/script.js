const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

document.querySelector(".sign-up-form")
.addEventListener("submit",signup)

function signup(){
    event.preventDefault();
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    console.log(username,email,password)

}

document.querySelector(".sign-in-form")
.addEventListener("submit",login)

function login(){
    event.preventDefault();
    let username = document.querySelector("#username1").value;
    let password = document.querySelector("#password1").value;
    console.log(username,password)

}




/* Tarannum A */