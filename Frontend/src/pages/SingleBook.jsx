import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  console.log(id);
  const fetchBook = async () => {
    const response = await axios.get(
      `https://lms-xihm.onrender.com/book/${id}`
    );
    if (response.status === 200) {
      setBook(response.data.data);
    }
  };

  //Delete Book:
  const handleDelete = async () => {
    const response = await axios.delete(`https://lms-xihm.onrender.com/${id}`);
    if (response.status === 200) {
      console.log("Book deleted successfully.");
      navigate("/");
    } else {
      console.error("Error deleting the book:", error);
      alert("Failed to delete the book");
    }
  };

  // Fetch the book details when the component mounts:
  useEffect(() => {
    fetchBook();
  }, []);
  console.log(book);

  return (
    <>
      <Navbar />
      <div className="bg-white h-45 rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40  m-20 ">
        <div className="relative ">
          <img
            src={
              book.imageUrl
                ? book.imageUrl
                : "https://assets.penguinrandomhouse.com/wp-content/uploads/2016/01/11104627/21Books-PRH_site_1200x628.jpg"
            }
            alt="Image"
            className="h-72 w-[100%] object-cover rounded-t-xl"
          />
        </div>
        <div className="p-4">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {book.bookName}
          </p>
          <span className="text-gray-400 mr-3 uppercase text-xs">
            isbnNumber: {book.isbnNumber}
          </span>
          <span className="text-gray-400 mr-3 uppercase text-xs">
            Author:{book.authorName}
          </span>
          <span className="text-gray-400 mr-3 uppercase text-xs">
            Publication: {book.publication}
          </span>
          <span className="text-gray-400 mr-3 uppercase text-xs">
            Published At: {book.publishedAt}
          </span>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              Rs. {book.bookPrice}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                Rs. {book.bookPrice + 400}
              </p>
            </del>
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-3"
        >
          <Link to={`/editBook/${book._id}`}>Edit</Link>
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default SingleBook;
