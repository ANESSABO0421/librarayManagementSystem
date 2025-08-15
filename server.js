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
        if(updateBook){
          res.writeHead(200,{"content-type":"application/json"})
          res.end("updated successfully")
        }
      });
    } catch (error) {
      res.writeHead(500,{"content-type":"application/json"})
      res.end(JSON.stringify({error:error.message}))
    }
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
