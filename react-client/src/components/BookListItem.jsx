import React from 'react';
import { Link } from 'react-router-dom';
import {List} from 'semantic-ui-react'

const BookListItem = (props) => (
  <li>
    <Link to={{
      pathname: `/book/${props.book._id}`,
      state: {
        book: props.book
      }
    }}>
      &nbsp;<img className="image-thumbnail" src={props.book.thumbnail} /><span className="book-list-item">{props.book.title}, {props.book.author}</span>
    </Link>
  </li>
);

export default BookListItem;

