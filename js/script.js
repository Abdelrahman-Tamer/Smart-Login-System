// variable declarations

// Input fields
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

// Eye icons
var eye = document.getElementById("eye");
var eyeSlash = document.getElementById("eye-slash");

// Alerts
var alertSignUp = document.getElementById("alertSignUp");
var alertLogin = document.getElementById("alertLogin");
var alertLoginFill = document.getElementById("alertLoginFill");
var successLogin = document.getElementById("successLogin");
var successSignUp = document.getElementById("successSignUp");
var alertExist = document.getElementById("alertExist");

// Regex patterns
var emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegx = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
var nameRegx = /^[a-zA-Z ]{3,}$/;

// Users array
var users;

// users array initialization
if (localStorage.getItem("data") === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("data"));
}

// regex input object
var regexInput = {
  loginEmail: emailRegx,
  loginPassword: passwordRegx,
  signupName: nameRegx,
  signupEmail: emailRegx,
  signupPassword: passwordRegx,
};

// hide alerts on load
if (alertSignUp) alertSignUp.classList.add("d-none");
if (alertLogin) alertLogin.classList.add("d-none");
if (successLogin) successLogin.classList.add("d-none");
if (alertLoginFill) alertLoginFill.classList.add("d-none");
if (successSignUp) successSignUp.classList.add("d-none");
if (alertExist) alertExist.classList.add("d-none");

// sign up user function
function signUpUser() {
  if (
    validateInputs(signupEmail) &
    validateInputs(signupPassword) &
    validateInputs(signupName)
  ) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === signupEmail.value) {
        alertExist.classList.remove("d-none");
        alertExist.classList.remove("hidden");
        setTimeout(() => {
          alertExist.classList.add("hidden");
          setTimeout(() => {
            alertExist.classList.add("d-none");
          }, 500);
        }, 5000);
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
    successSignUp.classList.remove("d-none");
    successSignUp.classList.remove("hidden");
    setTimeout(() => {
      successSignUp.classList.add("hidden");
      setTimeout(() => {
        successSignUp.classList.add("d-none");
      }, 500);
    }, 1500);
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1500);
  } else {
    alertSignUp.classList.remove("d-none");
    alertSignUp.classList.remove("hidden");
    setTimeout(() => {
      alertSignUp.classList.add("hidden");
      setTimeout(() => {
        alertSignUp.classList.add("d-none");
      }, 500);
    }, 5000);
  }
}

// login user function
function loginUser() {
  if (validateInputs(loginEmail) && validateInputs(loginPassword)) {
    var user = null;
    for (var i = 0; i < users.length; i++) {
      if (
        users[i].email === loginEmail.value &
        users[i].password === loginPassword.value
      ) {
        user = users[i];
        localStorage.setItem("currentUserIndex", i);
        break;
      }
    }

    if (user == null) {
      alertLogin.classList.remove("d-none");
      alertLogin.classList.remove("hidden");
      setTimeout(() => {
        alertLogin.classList.add("hidden");
        setTimeout(() => {
          alertLogin.classList.add("d-none");
        }, 500);
      }, 5000);
      return;
    } else {
      successLogin.classList.remove("d-none");
      successLogin.classList.remove("hidden");
      setTimeout(() => {
        successLogin.classList.add("hidden");
      }, 1500);
      setTimeout(() => {
        window.location.href = "./html/home.html";
      }, 1500);
    }

  } else {
    alertLoginFill.classList.remove("d-none");
    alertLoginFill.classList.remove("hidden");
    setTimeout(() => {
      alertLoginFill.classList.add("hidden");
      setTimeout(() => {
        alertLoginFill.classList.add("d-none");
      }, 500);
    }, 5000);
  }

  clearLoginInputs();
}

// clear sign up inputs
function clearSignUpInputs() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupName.classList.remove("is-valid", "is-invalid");
  signupEmail.classList.remove("is-valid", "is-invalid");
  signupPassword.classList.remove("is-valid", "is-invalid");
}

// clear login inputs
function clearLoginInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
  loginEmail.classList.remove("is-valid", "is-invalid");
  loginPassword.classList.remove("is-valid", "is-invalid");
}

// validate input fields
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

// display user name on home page
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

// logout function
function logout() {
  localStorage.removeItem("currentUserIndex");
  window.location.href = "../index.html";
}

// onload event for displaying user name
window.onload = function () {
  // Only call displayUserName if we're on the home page
  var userNameElement = document.getElementById("userName");
  if (userNameElement) {
    displayUserName();
  }
};

// show/hide login password
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

// show/hide sign up password
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
