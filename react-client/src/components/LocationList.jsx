import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LocationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    this.fetchLocations();
  }

  fetchLocations() {
    axios.get('/fetchlocations')
      .then((result) => {
        // console.log(result)
        this.setState({
          locations: result.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div>
        <div className="page-title move-down">
        <h2>Location List</h2>
        <h4>There are {this.state.locations.length} locations in the home library.</h4>
        </div>
        <ol>
          {this.state.locations.map((location, i) => (
              <li key={i}>
                <Link to={`/location/${location}`} >
                &nbsp;{location}
                </Link>
              </li>
          ))
          }
        </ol>
      </div>
    );
  }

}

export default LocationList;