import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthorList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentDidMount() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    axios.get('/fetchauthors')
      .then((result) => {
        // console.log(result)
        this.setState({
          authors: result.data
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
        <h2>Author List</h2>
        <h4>There are {this.state.authors.length} authors in the home library.</h4>
        </div>
        <ol>
          {this.state.authors.map((author, i) => (
            <li key={i}>
              <Link to={{
                pathname: `/author/${author}`,
                state: author
              }} >

                &nbsp;{author}
              </Link>
            </li>
            ))
          }
        </ol>
      </div>
    );
  }

}

export default AuthorList;