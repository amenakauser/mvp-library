import React from 'react';
import axios from 'axios';

import BookList from './BookList.jsx';

class AuthorDescription extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props.match.params.author)
    this.state = {
      books: []
    }
  }

  componentDidMount () {
    axios.get(`/fetchbooksbyauthor/${this.props.match.params.author}`)
      .then(result => {
        // console.log(result.data)
        this.setState({
          books: result.data
        })
        // console.log(this.state.books)
      })
      .catch('error fetching books for this author from server');
  }

  render () {
    return (
      <div>
        <div className="page-title"><h4>There are {this.state.books.length} book(s) by {this.props.match.params.author} in the home library.</h4></div>
        <BookList books = {this.state.books} />
      </div>
    );
  }

}

export default AuthorDescription;

