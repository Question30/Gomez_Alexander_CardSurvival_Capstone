function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//form event listner

const formEl = document.getElementById("form");
if (formEl !== null) {
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    let response;
    if (event.target.name === "login") {
      response = handleLogin(event);
    } else if (event.target.name === "signup") {
      response = handleSignup(event);
    } else {
      response = handleSupport(event);
    }

    console.log(response);
  });
}

//Handle Login submission
function handleLogin(event) {
  const response = {
    email: event.target.email.value,
    password: event.target.pasword.value,
  };
  console.log(response);
  window.location.replace("http://localhost:5500/index.html");
  return response;
}

//Handle Sign up Submission
function handleSignup(event) {
  const response = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
    confirmPassword: event.target.confirm_password.value,
  };

  if (checkPassword(response.password, response.confirmPassword)) {
    console.log(response);
    // window.location.replace("http://localhost:5500/login.html");
  } else {
    displayError();
    return;
  }
  return response;
}

// Signup Validation
function checkPassword(password, confirmedPassword) {
  return password === confirmedPassword;
}

//Create Error message under Login
function displayError() {
  const errorMessage = document.createElement("div");
  errorMessage.innerText = "Error your passwords do not match!";

  errorMessage.style.color = "red";
  errorMessage.style.textAlign = "center";

  formEl.appendChild(errorMessage);
}

//Contact Form
function handleSupport(event) {
  console.dir(event.target);
  const response = {
    email: event.target.email.value,
    subject: event.target.dropdown.value,
    content: event.target.details.value,
  };
  console.log(response);
  alert(response.subject + " sent!");
}
