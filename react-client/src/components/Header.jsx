import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';


const Header = () => (
  <div className="navbar">
    <Link to="/" className="no-underline"><h1>Home Library</h1></Link>
    <NavLink to='/' exact activeClassName="is-active">Home</NavLink><br/>
    <NavLink to='/addbook' activeClassName="is-active">Add a Book</NavLink><br/>
    <NavLink to='/books' activeClassName="is-active">All Books</NavLink><br/>
    <NavLink to='/authors' activeClassName="is-active">All Authors</NavLink><br/>
    <NavLink to='/locations' activeClassName="is-active">All Locations</NavLink><br/><br/>
    <NavLink to='/busybooks' activeClassName="is-active">Books on a Stroll</NavLink><br/>
    <br/><br/>
    <NavLink to='/randombook' activeClassName="is-active">Pick a book for me!</NavLink>
  </div>
);

export default Header;