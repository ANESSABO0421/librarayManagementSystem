const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const url = require("url");
const http = require("http");
const client = new MongoClient("mongodb://127.0.0.1:27017/");
const port = 5000;

const server = http.createServer(async (req, res) => {
  const db = client.db("LibraryManagement");
  const userCollections = db.collection("userCollection");
  const bookCollection = db.collection("bookCollection");
  const borrowedBooksCollection = db.collection("borrowedBooks");
  const path = url.parse(req.url).pathname;

  //routes && jsfile
  if (path === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./Login.html"));
  } else if (path === "/Signup") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./Signup.html"));
  } else if (path === "/Signup.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("./Signup.js"));
  } else if (path === "/userHome") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./userHome.html"));
  } else if (path === "/handleLogin.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("./handleLogin.js"));
  } else if (path === "/adminHome") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./adminHome.html"));
  } else if (path === "/adminProfile") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./adminProfile.html"));
  } else if (path === "/editAdmin") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./editAdmin.html"));
  } else if (path === "/addbook") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./addbook.html"));
  } else if (path === "/handleBook.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("./handleBook.js"));
  } else if (path === "/viewProfile") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./viewProfile.html"));
  } else if (path === "/editUser") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./editUser.html"));
  } else if (path === "/manageBooks") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./manageBooks.html"));
  } else if (path === "/EditBook") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./EditBook.html"));
  } else if (path === "/handleEditBook.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("./handleEditBook.js"));
  } else if (path === "/userBorrowedBooks") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync("./userBorrowedBooks.html"));
  } else if (path === "/handleBorrowed.js") {
    res.writeHead(200, { "content-type": "text/js" });
    res.end(fs.readFileSync("./handleBorrowed.js"));
  }

  //api
  //////////////LOGIN////////////////////////////
  if (path === "/login" && req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        const { email, password } = objectData;
        let login = await userCollections.findOne({ email, password });
        if (login) {
          res.writeHead(200, { "content-type": "text/plain" });
          res.end(JSON.stringify(login));
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(error);
    }
  }
  ///////////////// SignUp/////////////////////////////
  if (path === "/signup" && req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        let insertData = await userCollections.insertOne(objectData);

        if (insertData) {
          console.log("you have been successfully registered");
          res.writeHead(200, { "content-type": "text/plain" });
          res.end("you have been registered successfully");
        } else {
          console.log("Failed to register");
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("failed to register");
    }
  }
  //////////////GET USER/////////////////////////////
  if (path === "/getUser" && req.method === "GET") {
    try {
      let getuser = await userCollections.find().toArray();
      let stringData = JSON.stringify(getuser);
      if (getuser) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(stringData);
      }
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  ////////////////UPDATE USER(PUT)//////////////////////////
  if (path === "/update" && req.method === "PUT") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        let updateData = await userCollections.updateOne(
          { _id: new ObjectId(objectData._id) },
          {
            $set: {
              name: objectData.name,
              email: objectData.email,
              phoneNumber: objectData.phoneNumber,
              password: objectData.password,
              // check
              image: objectData.image,
            },
          }
        );
        if (updateData) {
          res.writeHead(200, { "content-type": "text/plain" });
          console.log("updated successfully");
          res.end("updated successfully");
        } else {
          console.log(" not updated ");
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  ////////////ADD BOOK///////////////////////////////////
  if (path === "/addbooks" && req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        let addBook = await bookCollection.insertOne(objectData);

        if (addBook) {
          // window.alert("book has been successfully added");
          res.writeHead(200, { "content-type": "text/plain" });
          res.end("book added successfully");
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(error);
    }
  }
  ///////////GET BOOK/////////////////////
  if (path === "/bookget" && req.method === "GET") {
    try {
      const book = await bookCollection.find().toArray();
      const stringData = JSON.stringify(book);
      if (stringData) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(stringData);
      }
    } catch (error) {
      res.writeHead(500, JSON.stringify({ error: error.message }));
    }
  }
  ///////////////////// UPDATE BOOK//////////////////////
  if (path === "/updatebook" && req.method === "PUT") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        let updateBook = await bookCollection.updateOne(
          { _id: new ObjectId(objectData._id) },
          {
            $set: {
              //JUST LIKE THE DATABASE WE POST . THE STRINGIFIED KEY
              bookId: objectData.bookId,
              bookTitle: objectData.bookTitle,
              author: objectData.author,
              genre: objectData.genre,
              status: objectData.status,
            },
          }
        );
        if (updateBook) {
          res.writeHead(200, { "content-type": "application/json" });
          res.end("updated successfully");
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }
  //////////////delete data/////////////////////////////
  if (path === "/deleteBook" && req.method === "DELETE") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        let objectData = JSON.parse(body);
        let deleteData = await bookCollection.deleteOne({
          _id: new ObjectId(objectData._id),
        });

        if (deleteData) {
          res.writeHead(200, { "content-type": "text/plain" });
          res.end("data is deleted uccessfully");
        }
      });
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  ///////////////////BORROW BOOK////////////////////////
  if (path === "/borrow" && req.method === "POST") {
    let body = "";
    req.on("data", (chunks) => {
      body += chunks.toString();
    });

    req.on("end", async () => {
      const { rBookId, userId } = JSON.parse(body);

      try {
        const book = await bookCollection.findOne({
          _id: new ObjectId(rBookId),
        });
        // no book found
        if (!book) {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(JSON.stringify({ success: false, message: "not found" }));
          return;
        }

        if (book.status === "Borrowed") {
          res.writeHead(500, {
            "content-type": "text/plain",
          });
          res.end(
            JSON.stringify({ success: false, message: "already borrowed" })
          );
          return;
        }

        // 2 process at same time
        // if found then update to borrow
        await bookCollection.updateOne(
          { _id: new ObjectId(rBookId) },
          { $set: { status: "Borrowed" } }
        );

        // insert data to borrowed book
        await borrowedBooksCollection.insertOne({
          bookId: new ObjectId(rBookId),
          userId: new ObjectId(userId),
          title: book.bookTitle,
          genre: book.genre,
          author: book.author,
          borrowedAt: new Date(),
          returnDate: null,
        });
        // borrowed message

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "book borrowed" }));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Server error" }));
      }
    });
  }
  if (path === "/getBorrowedBook" && req.method === "GET") {
    try {
      let displayBorrowed = await borrowedBooksCollection.find().toArray();
      let stringifyData = JSON.stringify(displayBorrowed);

      if (displayBorrowed) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(stringifyData);
      } else {
        window.alert("failed to display the data");
      }
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end({ error: error.message });
    }
  }

  /////////RETURN BOOK//////////////////////////////////////
  if (path === "/return" && req.method === "POST") {
    try {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks.toString();
      });
      req.on("end", async () => {
        //bBook for updating the return date and rBookId for updating the the status of the to available
        const { bBookId, rBookId } = JSON.parse(body);
        try {
          //UPDATE THE RETURN DATE
          await borrowedBooksCollection.updateOne(
            { _id: new ObjectId(bBookId) },
            { $set: { returnDate: new Date() } }
          );
          //UPDATEING THE AVAILABILITY OF BOOK
          await bookCollection.updateOne({
            _id: new ObjectId(rBookId),
          },
          {$set:{status:"Available"}}
        );

        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({success:true,message:"Book returned"}))
        } catch (error) {
          console.log(error)
          res.writeHead(500,{"content-type":"application/json"})
          res.end(JSON.stringify({success:false,message:"server error"}))
        }
      });
    } catch (error) {}
  }
});

client
  .connect()
  .then(() => {
    console.log("mongoDB connected");
    server.listen(port, () => {
      console.log(`server created at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
