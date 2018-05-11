import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import ChangeBookLocation from './ChangeBookLocation.jsx';

class BookDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onHomePage: false,
      changeLocation: false
    }
  }

  deleteBook(id) {
    // console.log(id)
    var params = {
      bookId: id
    };
    axios.post('/deletebook', params)
      .then(result => {
        alert(`${this.props.book.title} has been deleted.`);
        this.setState({
          onHomePage: true
        });

      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      });
  }

  checkoutBook(id) {
    var params = {
      bookId: id
    };
    axios.post('/checkoutbook', params)
      .then(result => {
        alert(`${this.props.book.title} has been checked out of ${this.props.book.location}.`);
        this.setState({
          onHomePage: true
        });
      })
      .catch(err => {
        console.log('error checking out book');
      });
  }

  putBookOnShelf(id) {
    var params = {
      bookId: id
    };
    axios.post('/putbookonshelf', params)
      .then(result => {
        alert(`${this.props.book.title} has been put back on the shelf in ${this.props.book.location}.`)
        this.setState({
          onHomePage: true
        });
      })
      .catch(err => {
        console.log('error');
      });
  }

  changeLocation() {
    console.log('in change location')
    this.setState({
      changeLocation: true
    });
  }



  render() {
    if (this.state.changeLocation) {
      return (
        <ChangeBookLocation id={this.props.book._id} />
      );
    }
    if (this.state.onHomePage) {
      return (
        <Redirect to="/" />
      );
    } else if (this.props.book === undefined) {
      return null;
    } else {
      if (this.props.book.onShelf) {
        var onShelf = 'Yes';
      } else {
        var onShelf = 'No';
      }
      return (
        <div className="book">
          <h2>{this.props.book.title}, {this.props.book.author}</h2>
          <div className="image-description">
            <img src={this.props.book.thumbnail} /><br/>
          </div><br/>
          <a href={this.props.book.link}>{this.props.book.link}</a>
          <div className='text'><h4>Description:</h4> {this.props.book.description}</div>
          <div><span className='book-info'>Location of Book:&nbsp;&nbsp;</span>{this.props.book.location}</div>
          <div><span className='book-info'>Is Book on Shelf:&nbsp;&nbsp;</span>{onShelf}</div>
          <div><span className='book-info'>ISBN10:&nbsp;</span>{this.props.book.ISBN10}</div>
          <div><div className='book-info'>ISBN13:&nbsp;</div>{this.props.book.ISBN13}</div>
          {this.props.book.onShelf && <button className='btn' onClick={(e) => (this.checkoutBook(this.props.book._id))}>Checkout Book to Read</button>}
          {!this.props.book.onShelf && <button className='btn' onClick={(e) => (this.putBookOnShelf(this.props.book._id))}>Keep book back on shelf</button>}<br/>
          <button className='btn' onClick={this.changeLocation.bind(this)}>Change Location</button><br/>
          <button className='btn' onClick={(e) => (this.deleteBook(this.props.book._id))}>Delete Book</button><br/>
        </div>
      );
    }
  }
}

export default BookDetail;