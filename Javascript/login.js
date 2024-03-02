let email = document.getElementById("email");
if (document.getElementById("login")) {
  document.getElementById("login").addEventListener("click", fetchUser);
}
function fetchUser(e) {
  e.preventDefault();
  let password = document.getElementById("password");
  if (email.value !== "" && password.value !== "") {
    let users = JSON.parse(localStorage.getItem("users"));
    let found = false;
    // console.log(users);
    console.log(found);
    for (let ele of users) {
      if (ele.email === email.value) {
        if (password.value === ele.password) {
          found = true;
          break;
        } else {
          alert("Wrong Password !!!!");
        }
      }
    }
    console.log(found);
    if (found) {
      window.open("./home.html");
      localStorage.setItem("presentUser", email.value);
    } else {
      alert("user details not found");
    }
  } else {
    alert("Please Fill out all the Fields");
  }
}
