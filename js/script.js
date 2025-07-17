var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var eye = document.getElementById("eye");
var eyeSlash = document.getElementById("eye-slash");

var emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegx = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
var nameRegx = /^[a-zA-Z]{3,}$/;
var users;
if (localStorage.getItem("data") === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("data"));
}
var regexInput = {
  loginEmail: emailRegx,
  loginPassword: passwordRegx,
  signupName: nameRegx,
  signupEmail: emailRegx,
  signupPassword: passwordRegx,
};

function signUpUser() {
  if (
    validateInputs(signupEmail) &
    validateInputs(signupPassword) &
    validateInputs(signupName)
  ) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === signupEmail.value) {
        alert("Email already exists.");
        return;
      }
    }
    var user = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    users.push(user);
    localStorage.setItem("data", JSON.stringify(users));
    clearSignUpInputs();
    console.log(users);
    window.location.href = "../index.html";
  } else {
    alert("Please fill in all fields correctly.");
  }
}

function loginUser() {
  if (validateInputs(loginEmail) && validateInputs(loginPassword)) {
    var user = null;
    for (var i = 0; i < users.length; i++) {
      if (
        users[i].email === loginEmail.value &&
        users[i].password === loginPassword.value
      ) {
        user = users[i];
        localStorage.setItem("currentUserIndex", i);
        break;
      }
    }

    if (user == null) {
      alert("Invalid email or password.");
      return;
    } else {
      window.location.href = "./html/home.html";
    }

  } else {
    alert("Please fill in all fields correctly.");
  }

  clearLoginInputs();
}

function clearSignUpInputs() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupName.classList.remove("is-valid", "is-invalid");
  signupEmail.classList.remove("is-valid", "is-invalid");
  signupPassword.classList.remove("is-valid", "is-invalid");
}
function clearLoginInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
  loginEmail.classList.remove("is-valid", "is-invalid");
  loginPassword.classList.remove("is-valid", "is-invalid");
}

function validateInputs(element) {
  if (regexInput[element.id].test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

function displayUserName() {
  var currentUserIndex = localStorage.getItem("currentUserIndex");
  if (currentUserIndex !== null && users[currentUserIndex]) {
    var name = `<h1 class="text-light fs-2 st-italic">Welcome <span class="text-dark fw-bold fs-1 font-monospace ">${users[currentUserIndex].name}</span></h1>`;
    var userNameElement = document.getElementById("userName");
    if (userNameElement) {
      userNameElement.innerHTML = name;
    }
  }
}

function logout() {
  localStorage.removeItem("currentUserIndex");
  window.location.href = "../index.html";
}

window.onload = function () {
  // Only call displayUserName if we're on the home page
  var userNameElement = document.getElementById("userName");
  if (userNameElement) {
    displayUserName();
  }
};


function showLoginPassword() {
  var x = document.getElementById("loginPassword");
  if (x.type === "password") {
    x.type = "text";
    eyeSlash.classList.add("d-none");
    eye.classList.remove("d-none");
  } else {
    x.type = "password";
    eyeSlash.classList.remove("d-none");
    eye.classList.add("d-none");
  }
}
function showSignUpPassword() {
  var x = document.getElementById("signupPassword");
  if (x.type === "password") {
    x.type = "text";
    eyeSlash.classList.add("d-none");
    eye.classList.remove("d-none");
  } else {
    x.type = "password";
    eyeSlash.classList.remove("d-none");
    eye.classList.add("d-none");
  }
}