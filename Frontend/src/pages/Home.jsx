import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import axios from "axios";
const Home = () => {
  //Backend:
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3000/book");
    if (response.status === 200) {
      setBooks(response.data.data);
      //'response.data' is same
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);

  return (
    <>
      <Navbar />
      <div>
        <div className="text-center p-10">
          <h1 className="font-bold text-4xl mb-4 mt-8">
            Library Management System
          </h1>
          <h1 className="text-3xl font-bold text-red-500">Top Products</h1>
        </div>
        <div className="flex flex-wrap ">
          {books.length > 0 &&
            books.map((book) => {
              return <Card key={book._id} book={book} />;
            })}
        </div>
        <div className="text-center py-10 px-10">
          <h2 className="font-bold text-2xl md:text-4xl mb-4">
            Thanks for visiting our website.
            <br />
            Hope to see you again!
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
