import React from 'react';
import axios from 'axios';

import BookDetail from './BookDetail.jsx';

class PickRandomBook extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: ''
    };
  }

  componentDidMount() {
    axios.get('./fetchrandombook')
      .then((result) => {
        console.log(result.data)
        // console.log(result.data)
        // console.log(this)
        this.setState({
          book: result.data
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <BookDetail book={this.state.book} />
      </div>

    );
  }

}

export default PickRandomBook;