import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios'


import { LLProvider } from './contexts/llContext'

import Header from './components/Header'
import Home from './pages/Home'
import List from './pages/List'

const App = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  const [owners, setOwners] = useState([]);
  const [believers, setBelievers] = useState([]);

  useEffect(() => {
    Axios(baseUrl + '/owners')
      .then(({ data }) => {
        data.data.forEach(owner => owner.value = owner.name)
        setOwners(data.data)
      })
    Axios(baseUrl + '/believers')
      .then(({ data }) => {
        setBelievers(data.data)
      })
  }, []);
  return (
    <Router>
      <main className="App">
        <Header />
        <h1>Lugar Livre</h1>
        <LLProvider value={{ baseUrl, owners, believers }}>
          {/* STEP 1 */}
          <Home />
          {/* STEP 2 */}
          <List />
          {/* STEP 3 */}

        </LLProvider>
      </main>
    </Router>
  );
}

export default App;
