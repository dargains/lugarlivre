import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Intro from '../components/Intro'
import List from '../components/List'
import Confirmation from '../components/Confirmation'

export default function Home() {
  const baseUrl = 'http://myeverydayapps.com/public/_/items';
  const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ==';
  const [owners, setOwners] = useState([]);
  const [believers, setBelievers] = useState([]);
  const [currentOwner, setCurrentOwner] = useState({});
  const [chosenBeliever, setChosenBeliever] = useState({});
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleBelieverChange = id => {
    const newBeliever = believers.find(believer => believer.id === id)
    setChosenBeliever(newBeliever)
  }

  const sendEmail = () => {
    const { name, email } = chosenBeliever
    const data = JSON.stringify({
      "fromName": "Lugar Livre",
      "toEmail": email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`,
      "emailMessage": `Hey, tens um lugar de garagem! Muito fixe, huh?`
    })

    Axios.post(emailEndpoint, data)
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
    <div>
      <h1>Lugar Livre</h1>

      {/* STEP 1 */}
      <Intro
        owners={owners}
        currentOwner={currentOwner}
        handleOwnerChange={setCurrentOwner}
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={setStartDate}
        handleEndDateChange={setEndDate}
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
    </div>
  )
}
