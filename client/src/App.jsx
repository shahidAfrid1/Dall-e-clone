import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, CreatePost } from "./Pages";
import { Navbar } from "./components";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
