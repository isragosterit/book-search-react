import React, { useState } from 'react';
import BookModal from './BookModal';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBook, setModalBook] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    if (data.items) {
      setBooks(data.items);
    } else {
      setBooks([]);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const openModal = (book) => {
  if (!book) {
    console.error('Invalid book data when opening modal:', book);
    return;
  }
  
  setModalBook(book); // Set the selected book for the modal
  setIsModalOpen(true); // Open the modal
};
  
  const closeModal = () => {
    setModalBook(null); // Reset the selected book for the modal
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit} className='search-section'>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter book or author name"
        />
        <button type="submit">search</button>
      </form>
  
      {/*Display Books */}
      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || 'No image available'}
              alt="Book cover"
            />
            <h3>{book.volumeInfo.title}</h3>
            <button onClick={() => openModal(book)}>Details</button>
          </div>
        ))}
      </div>
  
      {/*Display Book Modal */}
      {isModalOpen && modalBook && (
        <BookModal book={modalBook} closeModal={closeModal} />
      )}
    </div>
  );
};

export default BookSearch;