import React from 'react';
import BookListItem from './BookListItem.jsx';

const BookList = (props) => (
  <div>
    <ol>
      {props.books.map((book, i) => (
          <BookListItem key={i} book={book} />
        ))
      }
    </ol>
  </div>
);

export default BookList;
