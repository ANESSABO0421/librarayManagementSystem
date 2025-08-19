// const url = new URL(window.location.href);
// const id = url.searchParams.get("id");
// // console.log(id)

// // get the book
// async function loadBook() {
//   const response = await fetch("http://localhost:5000/bookget");
//   const data = await response.json();
//   // console.log(data)
//   const book = data.find((books) => books._id == id);
//   console.log(book);

//   if (book) {
//     document.getElementById("bookId").value = book.bookId || " ";
//     document.getElementById("bookTitle").value = book.bookTitle || "";
//     document.getElementById("author").value = book.author || "";
//     document.getElementById("genre").value = book.genre || "";
//     document.getElementById("status").value = book.status || "";
//     document.getElementById("year").value = book.year || "";
//     document.getElementById("isbn").value = book.isbn || "";
//     document.getElementById("images").value = book.images || "";
//     document.getElementById("description").textContent = book.description || "";
//     console.log(book.description);
//   } else {
//     window.alert("user nor found");
//   }
// }

// loadBook();

// // edit data
// document
//   .getElementById("editBookForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();
//     const bookId = document.getElementById("bookId").value;
//     const bookTitle = document.getElementById("bookTitle").value;
//     const author = document.getElementById("author").value;
//     const genre = document.getElementById("genre").value;
//     const status = document.getElementById("status").value;
//     const year = document.getElementById("year").value;
//     const isbn = document.getElementById("isbn").value;
//     const description = document.getElementById("description").textContent;
//     const image = document.getElementById("images").value;
//     // console.log(description)

//     try {
//       const updateData = await fetch("http://localhost:5000/updatebook", {
//         method: "PUT",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           _id: id,
//           bookId,
//           bookTitle,
//           author,
//           genre,
//           status,
//           year,
//           isbn,
//           description,
//           image,
//         }),
//       });
//       if (updateData) {
//         window.alert("data has been updated");
//         window.location.href = "/manageBooks";
//         // window.location.reload()
//       } else {
//         window.alert("data is not updated");
//       }
//     } catch (error) {
//       window.alert(error);
//     }
//   });

// // image preview logic
// const imageInput = document.getElementById("images");
// const preview = document.getElementById("previewImage");

// imageInput.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     preview.src = URL.createObjectURL(file);
//     preview.classList.remove("hidden");
//   }
// });
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

async function loadBook() {
  const response = await fetch("http://localhost:5000/bookget");
  const data = await response.json();
  const book = data.find((b) => b._id == id);

  if (book) {
    document.getElementById("bookId").value = book.bookId || "";
    document.getElementById("bookTitle").value = book.bookTitle || "";
    document.getElementById("author").value = book.author || "";
    document.getElementById("genre").value = book.genre || "";
    document.getElementById("status").value = book.status || "";
    document.getElementById("year").value = book.year || "";
    document.getElementById("isbn").value = book.isbn || "";
    document.getElementById("description").value = book.description || "";
    document.getElementById("price").value = book.price || "";

    if (book.image) {
      const preview = document.getElementById("previewImage");
      preview.src = book.image;
      preview.classList.remove("hidden");
    }
  } else {
    window.alert("Book not found");
  }
}

loadBook();

document
  .getElementById("editBookForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const bookId = document.getElementById("bookId").value;
    const bookTitle = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;
    const year = document.getElementById("year").value;
    const isbn = document.getElementById("isbn").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const preview = document.getElementById("previewImage");
    const image = preview.src; 

    try {
      const updateData = await fetch("http://localhost:5000/updatebook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          bookId,
          bookTitle,
          author,
          genre,
          status,
          year,
          isbn,
          description,
          image,
          price
        }),
      });

      if (updateData.ok) {
        window.alert("Book updated successfully");
        window.location.href = "/adminHome";
      } else {
        window.alert("Update failed");
      }
    } catch (error) {
      window.alert(error);
    }
  });

const imageInput = document.getElementById("images");
const preview = document.getElementById("previewImage");

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.classList.remove("hidden");
  }
});
