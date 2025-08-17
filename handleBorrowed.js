async function DisplayBorrowedBook() {
  const response = await fetch("http://localhost:5000/getBorrowedBook");
  const data = await response.json();
  console.log(data);
  let str = "";
  {
    data.map((books) => {
      str += `
        <div>
        <p>${books.name}</p>
        </div>
        `;
    });
  }
  document.getElementById("main").innerHTML += str;
}

DisplayBorrowedBook();
