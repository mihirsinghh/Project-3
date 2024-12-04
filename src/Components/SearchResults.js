import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = ({ setFavorites }) => {
  // add/delete books
  const [books, setBooks] = useState([]);
  // location
  const location = useLocation();
  // search query
  const query = new URLSearchParams(location.search).get("query");
  // favorites
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    // if user search a book/author
    if (query) {
      axios
        // get the api for the specific query
        .get(`https://openlibrary.org/search.json?q=${query}`)
        .then((response) => {
          // add to books
          setBooks(response.data.docs || []);
        })
        // if unable to find the specific query, show error message
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  const addToFavorites = (book) => {
    // add the previous books on favorites to favorites
    setFavoriteBooks((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.key === book.key)) {
        const updatedFavorites = [...prevFavorites, book];
        // update parent's favorite list
        setFavorites(updatedFavorites);
        return updatedFavorites;
      }
      // if already in favorites, do nothing
      return prevFavorites; //
    });
  };

  // no query, return this message
  if (!query) {
    return <p>Please use the search bar to find books.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.key}>
            {/* book cover */}
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            {/* book details */}
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author_name?.[0] || "Unknown"}
              </p>
              <p>
                <strong>Summary:</strong>{" "}
                {book.first_sentence ? book.first_sentence[0] : "No summary available."}
              </p>
              {/* add to favorites */}
              <button onClick={() => addToFavorites(book)}>
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
