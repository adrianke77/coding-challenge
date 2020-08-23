import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'App.css';
import Videos from 'pages/Videos';
import Upload from 'pages/Upload';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Videos />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
