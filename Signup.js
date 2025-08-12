document
  .getElementById("SignupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNo").value;
    const password = document.getElementById("password").value;
    const type = document.getElementById("type").value;

    try {
      const insertData = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, password, type }),
      });
      if (insertData) {
        alert("user has been successfully added!!!");
        window.location.href = "/";
        console.log("user has been successfully added");
      } else {
        alert("failed add the user");
        console.log("unable to add the user");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(name, email, phoneNumber, password, type);
  });
