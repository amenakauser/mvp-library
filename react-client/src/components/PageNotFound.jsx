import React from 'react';

import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const PageNotFound = () => (
    <div>
    <br/> <br/> <br/>
    Page Not Found. 404!<br/>
    <Link to='/'>Go to HomePage</Link>
    </div>
);

export default PageNotFound;