document
  .getElementById("addBookForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const bookId = document.getElementById("bookId").value;
    const bookTitle = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;
    const userId = localStorage.getItem("userId");
    const file = document.getElementById("images").files[0];
    const year=document.getElementById("year").value
    const price=document.getElementById("price").value
    const isbn=document.getElementById("isbn").value
    const description=document.getElementById("description").value

    // convert image to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    let Base64File = file ? await toBase64(file) : "";

    console.log(bookId, bookTitle, author, genre, status);
    try {
      let addBook = await fetch("http://localhost:5000/addbooks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          bookTitle,
          author,
          genre,
          status,
          createdBy: userId,
          image: Base64File,
          year,
          price,
          isbn,
          description
        }),
      });
      if (addBook) {
        window.alert("book has been successfully added");
        window.location.href = "/adminHome";
      } else {
        window.alert("failed to add the book");
      }
    } catch (error) {
      console.log(error);
    }
  });



  // image preview
document.getElementById("images").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const preview = document.getElementById("previewImage");
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
});
