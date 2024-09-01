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

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  displayName:username,
  email:email,
  password:password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe_6IW2Y0TdrTtA4WvpVyaMlxl5EuRKO8", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.error){
      alert(`${result.error.message}`);
    }else{
      alert(`Sign up successfull`);
      container.classList.remove("sign-up-mode");
    }
  })
  .catch((error) => console.error(error));
}

document.querySelector(".sign-in-form")
.addEventListener("submit",login)

function login(){
    event.preventDefault();
    let username = document.querySelector("#username1").value;
    let password = document.querySelector("#password1").value;
    console.log(username,password)


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  email:username,
  password:password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe_6IW2Y0TdrTtA4WvpVyaMlxl5EuRKO8", requestOptions)
  .then((response) => response.json())
  .then((result) => {
          if(result.error){
            alert(`${result.error.message}`)
          }else{
            localStorage.setItem("authToken",result.idToken);
            window.location.href="../html/task.html";
          }
  })
  .catch((error) => console.error(error));
}




/* Tarannum A */