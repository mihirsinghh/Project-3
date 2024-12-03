// imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TrendingBooks = () => {
    // variable to fetch books data
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            // book api for best sellers
            .get("https://openlibrary.org/subjects/bestsellers.json")
            .then((response) => {
                // fetch book data
                setBooks(response.data.works || []);
            })
            // send error message if unable to fetch data
            .catch((err) => console.error("Error fetching trending books:", err));
    }, []);
    
    return (
        <div className="trending-container">
            <h2>Trending Books</h2>
            <div className="book-grid">
                {books.map((book) => (
                    <Link to={`/book/${book.key}`}>
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                            alt={book.title}
                        />
                        <p>{book.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TrendingBooks;
