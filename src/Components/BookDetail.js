// src/components/BookDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetail = ({ books, onBookmark }) => {
  // book id
  const { id } = useParams();
  // navigate
  const navigate = useNavigate();
  // get book
  const book = books.find((b) => b.key === id);

  // if book wasn't found, return this message
  if (!book) {
    return <p>Book not found</p>;
  }

  // handle bookmark action
  const handleBookmark = () => {
    onBookmark(book);
    alert("Book added to bookmarks!");
  };

  return (
    <div className="book-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
          alt={book.title}
        />
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.authors[0]?.name || "Unknown"}
        </p>
        <p>
          <strong>Year:</strong> {book.first_publish_year || "N/A"}
        </p>
        <p>
          <strong>Summary:</strong> {book.description || "No summary available"}
        </p>
        <button onClick={handleBookmark}>Bookmark</button>
      </div>
    </div>
  );
};

export default BookDetail;
