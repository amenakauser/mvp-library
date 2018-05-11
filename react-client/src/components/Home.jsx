import React from 'react';
import axios from 'axios';

import BookImages from './BookImages.jsx';
import PickRandomBook from './PickRandomBook.jsx'

// console.log(PickRandomBook)
// console.log(BookImages)

class Home extends React.Component {

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
        <BookImages books={this.state.books} />
      </div>
    );
  }

}

export default Home;
