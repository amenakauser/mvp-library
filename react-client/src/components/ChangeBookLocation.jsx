import React from 'react';
import axios from 'axios';

import Home from './Home.jsx';
import { Redirect } from 'react-router-dom';

class ChangeBookLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      locations: [],
      onHomePage: false
    };
  }

  componentDidMount() {
    axios.get('/fetchlocations')
      .then((result) => {
        // console.log(result)
        this.setState({
          locations: result.data,
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

  changeLocation() {
    var params = {
      id: this.props.id,
      newLocation: this.state.location
    }
    // console.log('params in ChangeBookLocation', params)
    axios.post('/changebooklocation', params)
      .then((result) => {
        // console.log(result)
        if (result.data.changed === true) {
          alert(`${result.data.book.title} has been placed in ${params.newLocation}`);
          this.setState({
            onHomePage: true
          });
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });

  }

  render() {
    if (this.state.onHomePage) {
      return (
        <Redirect to="/" />
      );
    }
    let locations = this.state.locations;
    let optionItems = locations.map((location) => {
      return (
        <option key={location}>{location}</option>
      );
    });
    return (
      <div>
      <br/>
        <h4>Enter new location for book: </h4><select name='location' value={this.state.location} onChange={this.onChange.bind(this)}>
          {optionItems}
        </select><br/><br/>
        <button onClick={this.changeLocation.bind(this)}>Submit</button>
      </div>
    );
  }

}

// class ChangeBookLocation extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       location: ''
//     };
//   }

//   onChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   changeLocation() {
//     this.setState({
//       location: ''
//     });
//     var params = {
//       id: this.props.match.params.id,
//       newLocation: this.state.location
//     }
//     axios.post('/changebooklocation', params)
//       .then((result) => {
//         // console.log(result)
//         if (result.data.changed === true) {
//           alert(`${result.data.book.title} has been placed in ${params.newLocation}`);
//           this.props.history.push('/');
//         }
//       })
//       .catch((error) => {
//         console.log('error changing book location');
//       });

//   }

//   render() {
//     return (
//       <div>
//         <h2>Enter new location for book: </h2>
//         <input type='text' name='location' value={this.state.location} onChange={this.onChange.bind(this)} /><br/><br/><br/>
//         <button onClick={this.changeLocation.bind(this)}>Submit</button>
//       </div>
//     );
//   }

// }

export default ChangeBookLocation;