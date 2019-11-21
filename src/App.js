import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from 'axios'


import { LLProvider } from './contexts/llContext'

import Header from './components/Header'
import List from './pages/List'
import Home from './pages/Home'

const App = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  const [owners, setOwners] = useState([]);
  const [believers, setBelievers] = useState([]);

  useEffect(() => {
    Axios(baseUrl + '/owners')
      .then(({ data }) => {
        setOwners(data.data)
      })
    Axios(baseUrl + '/believers')
      .then(({ data }) => {
        setBelievers(data.data)
      })
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Lugar Livre</h1>
        <LLProvider value={{ baseUrl, owners, believers }}>
          <Switch>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </LLProvider>
      </div>
    </Router>
  );
}

export default App;
