import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import AddBook from "./pages/AddBook.jsx";
import EditBook from "./pages/EditBook.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/book/:id" element={<SingleBook />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route path="/editBook/:id" element={<EditBook />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
