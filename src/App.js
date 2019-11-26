import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header'
import Home from './pages/Home'
import AcceptScreen from './pages/AcceptScreen';
import RefuseScreen from './pages/RefuseScreen';

const App = () => {

  return (
    <Router>
      <main className="App">
        <Header />
        <Switch>
          <Route path="/accept">
            <AcceptScreen />
          </Route>
          <Route path="/refuse">
            <RefuseScreen />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>

      </main>
    </Router>
  );
}

export default App;
