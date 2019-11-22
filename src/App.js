import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Axios from 'axios'


import Header from './components/Header'
import Home from './pages/Home'
import List from './pages/List'
import Confirmation from './pages/Confirmation'

const App = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items';
  const [owners, setOwners] = useState([]);
  const [currentOwner, setCurrentOwner] = useState([]);
  const [believers, setBelievers] = useState([]);
  const [chosenBeliever, setChosenBeliever] = useState([]);
  const [date, setDate] = useState('')

  const handleOwnerChange = token => {
    const newOwner = owners.find(owner => owner.id === token.id)
    setCurrentOwner(newOwner)
  }

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
        {/* STEP 1 */}
        <Home
          owners={owners}
          currentOwner={currentOwner}
          handleOwnerChange={handleOwnerChange}
          date={date}
          handleDateChange={setDate}
        />
        {/* STEP 2 */}
        <List
          believers={believers}
          handleBelieverChange={setChosenBeliever}
        />
        {/* STEP 3 */}
        <Confirmation
          currentOwner={currentOwner}
          chosenBeliever={chosenBeliever}
        />
      </main>
    </Router>
  );
}

export default App;
