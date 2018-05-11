import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Home from '../components/Home.jsx';
import AddBook from '../components/AddBook.jsx';
import FetchBookList from '../components/FetchBookList.jsx';
import AuthorList from '../components/AuthorList.jsx';
import LocationList from '../components/LocationList.jsx';
import PickRandomBook from '../components/PickRandomBook.jsx';
import PageNotFound from '../components/PageNotFound.jsx';
import BookDescription from '../components/BookDescription.jsx';
import AuthorDescription from '../components/AuthorDescription.jsx';
import LocationInfo from '../components/LocationInfo.jsx';
import BooksOnStroll from '../components/BooksOnStroll.jsx';
import ChangeBookLocation from '../components/ChangeBookLocation.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/addbook' component={AddBook} />
        <Route exact path='/books' component={FetchBookList} />
        <Route exact path='/authors' component={AuthorList} />
        <Route exact path='/locations' component={LocationList} />
        <Route exact path='/randombook' component={PickRandomBook} />
        <Route exact path="/book/:id" component={BookDescription} />
        <Route exact path="/author/:author" component={AuthorDescription} />
        <Route exact path="/location/:location" component={LocationInfo} />
        <Route exact path="/busybooks" component={BooksOnStroll} />
        <Route exact path="/changelocation/:id" component={ChangeBookLocation} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;