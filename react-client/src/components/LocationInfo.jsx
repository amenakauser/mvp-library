import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookList from './BookList.jsx';

class LocationInfo extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props.match.params.location)
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get(`/fetchbooksbylocation/${this.props.match.params.location}`)
      .then((result) => {
        this.setState({
          books: result.data
        });
      })
      .catch(err => {
        console.log('error fetching books by location');
      })
  }

  render () {
    return (
      <div>
        <div className="page-title"><h4>There are {this.state.books.length} book(s) in the {this.props.match.params.location}.</h4></div>
        <BookList books={this.state.books} />
      </div>
    );
  }

}

export default LocationInfo;

