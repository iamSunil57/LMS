import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    authorName: "",
    publication: "",
    publishedAt: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    const response = await axios.patch(
      `https://lms-0qhv.onrender.com/book/${id}`,
      formData
    );
    if (response.status === 200) {
      navigate("/book/" + id);
    } else {
      alert("Something went wrong");
    }
  };

  // To keep previous data in edit form:
  const fetchBook = async () => {
    const response = await axios.get(
      "https://lms-0qhv.onrender.com/book/" + id
    );
    if (response.status === 200) {
      console.log(response.data.data);
      setData(response.data.data);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Edit Book
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form method="POST" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="bookName"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Book Name:
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="bookName"
                    name="bookName"
                    placeholder="book name"
                    type="text"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.bookName}
                    onChange={handleChange}
                  />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="bookPrice"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Price:
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="bookPrice"
                    name="bookPrice"
                    placeholder="book price"
                    type="number"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.bookPrice}
                    onChange={handleChange}
                  />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="isbnNumber"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Isbn Number:
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="isbnNumber"
                    name="isbnNumber"
                    placeholder="isbn number"
                    type="number"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.isbnNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="authorName"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Author
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="authorName"
                    name="authorName"
                    placeholder="author name"
                    type="text"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.authorName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="publication"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Publication
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="publication"
                    name="publication"
                    type="text"
                    placeholder="publications"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.publication}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="publishedAt"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Published date:
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="publishedAt"
                    name="publishedAt"
                    type="date"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={data.publishedAt}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  {/* To show old image in editBook page: */}
                  {data.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={data.imageUrl}
                        alt="Old book cover"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  )}
                  Image:
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    required=""
                    // value={files[0]}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Apply
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBook;
