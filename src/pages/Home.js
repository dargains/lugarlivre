import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import Intro from '../components/Intro'
import List from '../components/List'
import Confirmation from '../components/Confirmation'
import moment from 'moment'

export default function Home() {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ=='

  const [step, setStep] = useState(1)

  const [owners, setOwners] = useState([])
  const [believers, setBelievers] = useState([])
  const [currentOwner, setCurrentOwner] = useState({})
  const [chosenBeliever, setChosenBeliever] = useState({})
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [gotData, setData] = useState(false)

  const goToStep = newStep => {
    setStep(newStep)
  }

  const handleBelieverChange = id => {
    const newBeliever = believers.find(believer => believer.id === id)
    setChosenBeliever(newBeliever)
  }

  const sendEmail = id => {
    const { name, email } = chosenBeliever
    const data = JSON.stringify({
      "fromName": "Lugar Livre",
      "toEmail": "andre.dargains@fullsix.pt", //email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`,
      "emailMessage": `<div style="font-family: sans-serif;">
      <h2>Hey, tens um lugar de garagem!</h2>
      <br />
      <p>Clica <a href="http://localhost:3000/accept?code=${id}" style="display:inline-block; padding: 5px 10px; color: #f9c653;">aqui</a> para aceitar</p>
      <p>Clica <a href="http://localhost:3000/refuse?code=${id}" style="display:inline-block; padding: 5px 10px; color: #f9c653;">aqui</a> para recusar</p>
      </div>`
    })

    Axios.post(emailEndpoint, data)
  }

  const confirmLend = () => {

    Axios.post(baseUrl + '/loans', {
      owner_id: currentOwner.id,
      believer_id: chosenBeliever.id,
      start: moment(startDate).format('YYYY-MM-DD'),
      end: moment(endDate).format('YYYY-MM-DD')
    }).then(({ data }) => {
      const { id } = data.data;
      sendEmail(id);
      Cookies.set('lugarlivre', currentOwner.id);
    })
  }

  const getInfo = async () => {
    const ownersResponse = await Axios(baseUrl + '/owners');
    ownersResponse.data.data.forEach(owner => owner.value = owner.name)
    const owners = ownersResponse.data.data
    setOwners(owners)

    const ownerCookieId = Cookies.get('lugarlivre')
    const ownerCookie = owners.find(owner => owner.id === parseInt(ownerCookieId))
    if (ownerCookie) setCurrentOwner(ownerCookie)

    const believersResponse = await Axios(baseUrl + '/believers');
    const believers = believersResponse.data.data
    setBelievers(believers)

    setData(true)
  }


  useEffect(() => {
    getInfo()
  }, []);
  return (
    <Main>
      {/* STEP 1 */}
      {
        step === 1 && gotData &&
        <Intro
          owners={owners}
          currentOwner={currentOwner}
          handleOwnerChange={setCurrentOwner}
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={setStartDate}
          handleEndDateChange={setEndDate}
          handleNext={() => goToStep(2)}
        />
      }

      {/* STEP 2 */}
      {
        step === 2 &&
        <List
          believers={believers}
          chosenBeliever={chosenBeliever}
          handleBelieverChange={handleBelieverChange}
          handleNext={() => goToStep(3)}
          handleBack={() => goToStep(1)}
        />
      }

      {/* STEP 3 */}
      {
        step === 3 &&
        <Confirmation
          currentOwner={currentOwner}
          chosenBeliever={chosenBeliever}
          startDate={startDate}
          endDate={endDate}
          step={step}
          handleConfirmation={confirmLend}
          handleBack={() => goToStep(2)}
        />
      }
    </Main>
  )
}

const Main = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
`