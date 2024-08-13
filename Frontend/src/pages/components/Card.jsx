import React from "react";
import { Link } from "react-router-dom";

const Card = ({ book }) => {
  console.log(book);
  return (
    <>
      {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
      <section
        id="Projects"
        className="w-fit mx-auto grid justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img
            src={
              book.imageUrl
                ? book.imageUrl
                : "https://assets.penguinrandomhouse.com/wp-content/uploads/2016/01/11104627/21Books-PRH_site_1200x628.jpg"
            }
            alt="bookImage"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
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

            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                Rs. {book.bookPrice}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  Rs. {book.bookPrice + 400}
                </p>
              </del>
              <div className="ml-auto">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <Link to={`/book/${book._id}`}>Read More</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!--   🛑 Product card 1 - Ends Here  --> */}

        {/* <!--   ✅ Product card 2 - Starts Here 👇 --> */}
        {/* <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src={Image}
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
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

              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  $149
                </p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <div className="ml-auto">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit Book
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div> */}
        {/* <!--   🛑 Product card 2- Ends Here  --> */}
      </section>

      {/* <!-- 🛑 Grid Section - Ends Here --> */}
    </>
  );
};

export default Card;
