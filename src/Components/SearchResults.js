import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = ({ setFavorites }) => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://openlibrary.org/search.json?q=${query}`)
        .then((response) => {
          setBooks(response.data.docs || []);
        })
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  const addToFavorites = (book) => {
    setFavoriteBooks((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.key === book.key)) {
        const updatedFavorites = [...prevFavorites, book];
        setFavorites(updatedFavorites); // Update the parent's favorite list as well
        return updatedFavorites;
      }
      return prevFavorites; // If already in favorites, do nothing
    });
  };

  if (!query) {
    return <p>Please use the search bar to find books.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author_name?.[0] || "Unknown"}
              </p>
              <p>
                <strong>Summary:</strong>{" "}
                {book.first_sentence ? book.first_sentence[0] : "No summary available."}
              </p>
              <button onClick={() => addToFavorites(book)}>
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
