import React from 'react';
import axios from 'axios';

import Search from './Search.jsx';
import Home from './Home.jsx';
import { Link } from 'react-router-dom';

class AddBook extends React.Component {

  constructor(props) {
    super(props);
  }

  search(term, location) {
    console.log(`${term} was searched`);
    let params = {
      term: term,
      location: location || 'Living Room'
    };
    axios.post('/book', params)
      .then((result) => {
        if (result.data.saved === true) {
          alert(`${result.data.title} has been added to ${result.data.location}.`);
          // console.log('this.props.history in AddBook', this.props.history)
          this.props.history.push('/');
        } else {
          alert('ISBN may not be valid. Try again.');
        }
      })
      .catch((error) => {
        console.log('error sending ISBN to server');
      });
  }

  render() {
    return (
      <Search onSearch={this.search.bind(this)} />
    );
  }

}

export default AddBook;
