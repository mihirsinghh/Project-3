// src/App.js
// react tools
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// components for backend
import Navbar from "./Components/Navbar";
import TrendingBooks from "./Components/TrendingBooks";
import SearchResults from "./Components/SearchResults";
import Favorites from "./Components/Favorites";
import BookDetail from "./Components/BookDetail";

// style
import "./App.css";

const App = () => {
  // variable for search
  const [searchQuery, setSearchQuery] = useState("");
  // variable for search results
  const [searchResults, setSearchResults] = useState([]);
  // variable to store favorites
  const [favorites, setFavorites] = useState([]);
  // navigation
  const navigate = useNavigate();

  // get the search query
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search-container">
        {/* title */}
        <h1>BookWorm</h1>
        {/* subtitle */}
        <p>Search books by title or author</p>
        {/* search bar */}
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
