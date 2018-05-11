import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';

class BookImageItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookId: props.book._id
    }
  }

  render () {
    return (
      <div>
        <Link to={{
          pathname: `/book/${this.state.bookId}`,
          state: {
            book: this.props.book
          }
        }}>
        <img src={this.props.book.thumbnail} />
        </Link>
      </div>
    );
  }

}


export default BookImageItem;