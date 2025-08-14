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
