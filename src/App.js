import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Header from './components/Header'
import Home from './pages/Home'
import Accept from './pages/Accept';
import Refuse from './pages/Refuse';
import Error from './pages/Error';

const App = () => {

  return (
    <Router>
      <main className="App">
        {/* <Header /> */}
        <Switch>
          <Route path="/accept">
            <Accept />
          </Route>
          <Route path="/refuse">
            <Refuse />
          </Route>
          <Route path="/error">
            <Error />
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
