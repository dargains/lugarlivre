import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Axios from 'axios'
import moment from 'moment'


import Header from './components/Header'
import Home from './pages/Home'
import List from './pages/List'
import Confirmation from './pages/Confirmation'

const App = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items';
  const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ==';
  const [owners, setOwners] = useState([]);
  const [currentOwner, setCurrentOwner] = useState([]);
  const [believers, setBelievers] = useState([]);
  const [chosenBeliever, setChosenBeliever] = useState({});
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(null)

  const handleOwnerChange = token => {
    const newOwner = owners.find(owner => owner.id === token.id)
    setCurrentOwner(newOwner)
  }
  const handleBelieverChange = id => {
    const newBeliever = believers.find(believer => believer.id === id)
    setChosenBeliever(newBeliever)
  }

  const sendEmail = () => {
    const { name, email } = chosenBeliever
    const data = JSON.stringify({
      "toEmail": email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`,
      "emailMessage": "Hey, tens um lugar de garagem!"
    })


    Axios.post(emailEndpoint, data)
      .then(response => {
        console.log(response);
      })
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
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={setEndDate}
          handleEndDateChange={setStartDate}
        />

        {/* STEP 2 */}
        <List
          believers={believers}
          chosenBeliever={chosenBeliever}
          handleBelieverChange={handleBelieverChange}
        />

        {/* STEP 3 */}
        <Confirmation
          currentOwner={currentOwner}
          chosenBeliever={chosenBeliever}
          startDate={startDate}
          endDate={endDate}
          handleConfirmation={sendEmail}
        />

      </main>
    </Router>
  );
}

export default App;
