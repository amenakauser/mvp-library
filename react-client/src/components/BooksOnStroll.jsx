import React from 'react';
import axios from 'axios';

import BookList from './BookList.jsx';

class BooksOnStroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get('/getbooksonstroll')
      .then((result) => {
        // console.log(result)
        this.setState({
          books: result.data.books
        });
      })
      .catch(error => {
        console.log('error fetching books');
      });
  }

  render() {
    return (
      <div>
        <div className="page-title"><h4>There are {this.state.books.length} book(s) on a stroll!</h4></div>
        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default BooksOnStroll;