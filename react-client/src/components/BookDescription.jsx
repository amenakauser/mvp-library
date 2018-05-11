import React from 'react';
import {Image} from 'semantic-ui-react';
import BookDetail from './BookDetail.jsx';

const BookDescription = (props) => (
  <div>
    <BookDetail book={props.location.state.book} />
  </div>
);

export default BookDescription;