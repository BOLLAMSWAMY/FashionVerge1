let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmpassword");
let submitButton = document.getElementById("submit");
// console.log(name,email,password,confirmPassword)
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let found = false;
  if (
    name.value !== "" &&
    email.value !== "" &&
    password.value !== "" &&
    confirmPassword.value !== ""
  ) {
    if (password.value === confirmPassword.value) {
      let users = [];
      if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      }
      for (let ele of users) {
        if (ele.email === email.value) {
          found = true;
          break;
        }
      }
      if (found) {
        alert("E-mail already exists. Please do login");
      } else {
        let user = {
          name: name.value,
          email: email.value,
          password: password.value,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        document.write(
          `Dear ${name.value} You have successfully registered with us.`
        );
        let button = document.createElement("button");
        button.textContent = "Login";
        button.setAttribute("value", "login");
        button.setAttribute("id", "login");
        button.setAttribute("class", "btn");
        document.body.appendChild(button);
        let butt = document.getElementById("login");
        butt.onclick = (e) => {
          e.preventDefault();
          window.open("login.html");
        };
      }
    } else {
      alert("Password and Confirm Password should be same !!!");
    }
  } else {
    alert("Please Fill out all the Fields!!!!");
  }
});
