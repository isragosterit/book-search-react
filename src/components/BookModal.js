import React from 'react';

const BookModal = ({ book, closeModal }) => {
  if (!book || !book.volumeInfo) {
    console.error('Invalid book data:', book);
    return null; // Return null and log the invalid book data
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{book.volumeInfo.title}</h2>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || 'No image available'}
          alt="Book cover"
        />
        <p><strong>Author:</strong> {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
        <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate || 'Unknown'}</p>
        <p><strong>Page Count:</strong> {book.volumeInfo.pageCount || 'Unknown'}</p>
        <p><strong>Description:</strong> <span className="book-description">{book.volumeInfo.description || 'Unknown'}</span></p>
      </div>
    </div>
  );
};

export default BookModal;
