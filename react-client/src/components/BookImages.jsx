import React from 'react';

import BookImageItem from './BookImageItem.jsx';
import { Carousel } from 'react-responsive-carousel';


const BookImages = (props) => (
  <div>
    <div className="wrapper">
      {props.books.map((book, i) => (
          <BookImageItem className="book-image" key={i} book={book} />
        ))
      }
    </div>
  </div>
);

export default BookImages;
