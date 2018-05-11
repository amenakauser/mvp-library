import React from 'react';
import axios from 'axios';
import LocationModal from './LocationModal.jsx';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      location: '',
      newLocation: '',
      locations: [],
      show: false
    };
  }

  componentDidMount() {
    axios.get('/fetchlocations')
      .then((result) => {
        // console.log(result)
        this.setState({
          locations: result.data.concat('Other: I want to enter a new location'),
          location: result.data[0]
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  search(event) {
    // console.log('isbn, location', this.state)
    if (this.state.isbn === '') {
      alert('Enter an ISBN number');
    } else if (this.state.location !== 'Other: I want to enter a new location') {
      this.props.onSearch(this.state.isbn, this.state.location);
      this.setState({
        isbn: ''
      });
    } else {
      this.showModal();
    }
  }

  showModal() {
    this.setState({
      show: true
    });
  }

  hideModalAddLocation(newLocation) {
    this.setState({
      show: false
    });
    // console.log('in hideModalAddLocation', newLocation);
    this.props.onSearch(this.state.isbn, newLocation || 'Living Room');
  }

  render() {
    let locations = this.state.locations;
    let optionItems = locations.map((location) => {
      return (
        <option key={location}>{location}</option>
      );
    });
    return (
      <div>
        <div className="page-title move-down">
        <h2>Add a book</h2>
        </div>
        Enter ISBN-10 or ISBN-13:&nbsp;<input type='text' name='isbn' value={this.state.isbn} onChange={this.onChange.bind(this)} /><br/><br/>
        Enter location:&nbsp;<select name='location' value={this.state.location} onChange={this.onChange.bind(this)}>
          {optionItems}
        </select>
        <br/>
        <button className="btn" onClick={this.search.bind(this)}>Submit</button>
        <LocationModal show={this.state.show} handleClose={this.hideModalAddLocation.bind(this)}/>
      </div>
    );
  }

}

export default Search;