import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Videos from 'pages/Video/Videos';
import Upload from 'pages/Upload/Upload';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Videos />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
