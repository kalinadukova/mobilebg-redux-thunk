import HomePage from "./pages/Home/Home";
import React from "react";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="catalog" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
