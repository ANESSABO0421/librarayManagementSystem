const userId = localStorage.getItem("userId");
console.log(userId);

async function DisplayBorrowedBook() {
  const response = await fetch("http://localhost:5000/getBorrowedBook");
  const data = await response.json();
  const user = data.filter((u) => u.userId == userId);
  console.log(user);
  let str = "";
  {
    user.map((u) => {
      str += `
<div class="max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 hover:shadow-xl transition duration-300">
  <h1 class="text-2xl font-bold text-gray-800">${u.title}</h1>
  <p class="text-gray-600"><span class="font-semibold">Title:</span> ${
    u.title
  }</p>
  <p class="text-gray-600"><span class="font-semibold">Genre:</span> ${
    u.genre
  }</p>
  <p class="text-gray-600"><span class="font-semibold">Author:</span> ${
    u.author
  }</p>
  <p class="text-gray-600"><span class="font-semibold">Borrowed On:</span> ${
    u.borrowedAt.toString().split("T")[0]
  }</p>
   <p class="text-gray-600"><span class="font-semibold">Returned On:</span> ${
     u.returnDate ? u.returnDate.toString().split("T")[0] : "Not Returned"
   }</p>

   <button class="text-gray-600 bg-green-300 rounded-md text-green-800 p-2 hover:bg-green-500 duration-300 disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed" onclick="returnBook('${
     u._id
   }','${u.bookId}') " ${u.returnDate ? "disabled" : ""}>Return</button>
</div>
    `;
    });
  }
  document.getElementById("main").innerHTML += str;
}

DisplayBorrowedBook();

/////////////update return and availability of book///////////////

async function returnBook(bBookId, rBookId) {
  try {
    const response = await fetch("http://localhost:5000/return", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ bBookId, rBookId }),
    });

    const data = await response.json();

    if (data.success) {
      alert("successfully returned the book");
      location.reload();
    } else {
      alert("failed to return the book");
    }
  } catch (error) {
    console.error(error);
    alert("something went wrong");
  }
}
