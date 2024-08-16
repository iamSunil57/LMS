const express = require("express");
const app = express();

//File system:
const fs = require("fs");

const ConnectToDatabase = require("./database");
const Book = require("./model/bookModel");

//Multer Config:
// const { multer,storage } = require("./middleware/multerConfig");
const multer = require("./middleware/multerConfig").multer;
const storage = require("./middleware/multerConfig").storage;
const upload = multer({ storage: storage });

//Cors Package:
const cors = require("cors");

//To configure cors:
app.use(
  cors({
    origin: "*",
  })
);

// To parse incoming JSON requests
app.use(express.json());

//Database Connection:
ConnectToDatabase();

//API's
//Normal testing API:
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

//To create book:
app.post("/book", upload.single("image"), async (req, res) => {
  console.log(req.file);
  let fileName;
  if (!req.file) {
    fileName =
      "https://assets.penguinrandomhouse.com/wp-content/uploads/2016/01/11104627/21Books-PRH_site_1200x628.jpg";
  } else {
    fileName = "http://localhost:3000/" + req.file.filename;
  }

  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publication,
    publishedAt,
  } = req.body;

  await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publication,
    publishedAt,
    imageUrl: fileName,
  });
  res.status(201).json({
    message: "Book created successfully",
  });
});

//To get all books
app.get("/book", async (req, res) => {
  const books = await Book.find(); //returns array
  res.status(200).json({
    message: "Books fetched successfully",
    data: books,
  });
});

//To get single book
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id); //returns object
    if (!book) {
      res.status(200).json({
        message: "No book found",
      });
    } else {
      res.status(200).json({
        message: "Single Book fetched successfully",
        data: book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

//To update book
app.patch("/book/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const oldData = await Book.findById(id);
    let fileName;
    if (req.file) {
      const oldImagePath = oldData.imageUrl;
      console.log(oldImagePath);

      //To remove 'localhost:300' from past image path
      const localHostUrLength = "http://localhost:3000/".length;
      const oldImageNewPath = oldImagePath.slice(localHostUrLength);
      console.log(oldImageNewPath);

      // 'unlink' method to delete file
      fs.unlink(`./storage/${oldImageNewPath}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File deleted successfully.");
        }
      });
      fileName = "http://localhost:3000/" + req.file.filename;
    }

    const {
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publication,
      publishedAt,
    } = req.body;

    const book = await Book.findByIdAndUpdate(id, {
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publication,
      publishedAt,
      imageUrl: fileName,
    });
    if (!book) {
      res.status(404).json({
        message: "No book found",
      });
    } else {
      res.status(200).json({
        message: "Book updated successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

//To delete book:
app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  const oldData = await Book.findById(id);
  const oldImagePath = oldData.imageUrl;
  console.log("oldImagePath:", oldImagePath);
  const localHostUrlLength = "http://localhost:3000/".length;
  const oldImageNewPath = oldImagePath.slice(localHostUrlLength);

  console.log(oldImageNewPath);
  fs.unlink(`./storage/${oldImageNewPath}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
  const book = await Book.findByIdAndDelete(id);
  res.status(200).json({
    message: "Book deleted successfully",
  });
});

app.post("/storage", upload.single("image"), (req, res) => {
  try {
    // File upload successful
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    // Handle errors
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});
//To give access of storage folder only from nodejs
app.use(express.static("./storage/"));

app.listen(3000, (req, res) => {
  console.log("The server has started at port 3000");
});
