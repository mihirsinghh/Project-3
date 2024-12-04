import React from "react";

const Favorites = ({ favorites, setFavorites }) => {
  // Handle the delete action
  const handleDelete = (bookKey) => {
    // Filter out the book with the specific key
    setFavorites(favorites.filter((book) => book.key !== bookKey));
  };

  // if no books were added to favorites, print this
  if (!favorites || favorites.length === 0) {
    return <p>No favorite books added yet.</p>;
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Books</h2>
      {/* show favorite books info (cover, title, author, summary) */}
      <div className="book-grid">
        {favorites.map((book) => (
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
            </div>
            {/* add a delete button */}
            <button onClick={() => handleDelete(book.key)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
