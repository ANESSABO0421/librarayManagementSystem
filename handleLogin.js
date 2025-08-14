document
  .getElementById("LoginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    try {
      let isFound = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await isFound.json();
      console.log(data);
      if (isFound.status == 200 && data.type === "User") {
        window.alert("you have been successfully loggedin");
        localStorage.setItem("name:", data.name);
        localStorage.setItem("userId", data._id);
        window.location.href = "/userHome";
      } else if (isFound.status == 200 && data.type === "Admin") {
        window.location.href = "/adminHome";
        localStorage.setItem("name:", data.name);
        localStorage.setItem("userId", data._id);

        window.alert("you have been successfully loggedin");
      } else if (isFound.status == 500) {
        window.alert("your email or password is invalid");
      } else {
        window.alert("something wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  });
