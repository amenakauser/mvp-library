import React from 'react';
import axios from 'axios';

import BookList from './BookList.jsx';

class FetchBookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    axios.get('/fetchbooks')
      .then((result) => {
        // console.log(result)
        this.setState({
          books: result.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div>
        <div className="page-title">
          <h2>Book List</h2>
          <h4>There are {this.state.books.length} books in the home library.</h4>
        </div>
          <BookList books={this.state.books} />
      </div>
    );
  }

}

export default FetchBookList;