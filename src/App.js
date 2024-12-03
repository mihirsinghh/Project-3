// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TrendingBooks from "./Components/TrendingBooks";
import SearchResults from "./Components/SearchResults";
import Favorites from "./Components/Favorites";
import BookDetail from "./Components/BookDetail";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]); // Ensure this is initialized as an empty array
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <h1>BookWorm</h1>
        <p>Search books by title or author</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<TrendingBooks />} />
        <Route
          path="/search"
          element={<SearchResults setFavorites={setFavorites} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
        />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
};

export default App;
