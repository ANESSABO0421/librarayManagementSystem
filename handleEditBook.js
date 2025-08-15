const url = new URL(window.location.href);
const id = url.searchParams.get("id");
// console.log(id)

// get the book
async function loadBook() {
  const response = await fetch("http://localhost:5000/bookget");
  const data = await response.json();
  // console.log(data)
  const book = data.find((books) => books._id == id);
  console.log(book);

  if (book) {
    document.getElementById("bookId").value = book.bookId || " ";
    document.getElementById("bookTitle").value = book.bookTitle || "";
    document.getElementById("author").value = book.author || "";
    document.getElementById("genre").value = book.genre || "";
    document.getElementById("status").value = book.status || "";
  } else {
    window.alert("user nor found");
  }
}

loadBook();

// edit data
document
  .getElementById("editBookForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const bookId = document.getElementById("bookId").value;
    const bookTitle = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;

    try {
      const updateData = await fetch("http://localhost:5000/updatebook", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          bookId,
          bookTitle,
          author,
          genre,
          status,
        }),
      });
      if(updateData){
        window.alert("data has been updated")
        window.location.href="/manageBooks"
        // window.location.reload()
      }
      else{
        window.alert("data is not updated")
      }
    } catch (error) {
      window.alert(error)
    }
  });



  
