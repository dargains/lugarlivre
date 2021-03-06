import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

import Loading from '../components/Loading'
import Intro from '../components/Intro'
import List from '../components/List'
import Confirmation from '../components/Confirmation'
import Final from '../components/Final'

import { baseUrl, dataEndpoint, smsEndpoint } from '../helpers/endpoints'

export default function Home() {

  const [step, setStep] = useState(0)
  // const [hasData, setData] = useState(false)

  const [owners, setOwners] = useState([])
  const [believers, setBelievers] = useState([])
  const [loans, setLoans] = useState([])
  const [currentOwner, setCurrentOwner] = useState({})
  const [chosenBeliever, setChosenBeliever] = useState({})
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const goToStep = newStep => {
    setStep(newStep)
  }

  const handleBelieverChange = id => {
    const newBeliever = believers.find(believer => believer.id === id)
    setChosenBeliever(newBeliever)
  }

  // const sendEmail = id => {
  //   const { name, email } = chosenBeliever
  //   const data = JSON.stringify({
  //     "fromName": "Lugar Livre",
  //     "toEmail": email,
  //     "fromEmail": "lugar.livre@fullsix.pt",
  //     "emailSubject": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`,
  //     "emailMessage": `<div style="font-family: sans-serif;">
  //     <h2>Hey, tens um lugar de garagem!</h2>
  //     <br />
  //     <p>Clica <a href="${baseUrl}/accept?code=${id}" style="display:inline-block; padding: 5px 10px; color: #f9c653;">aqui</a> para aceitar</p>
  //     <p>Clica <a href="${baseUrl}/refuse?code=${id}" style="display:inline-block; padding: 5px 10px; color: #f9c653;">aqui</a> para recusar</p>
  //     </div>`
  //   })

  //   Axios.post(emailEndpoint, data)
  // }

  const sendSMS = id => {
    const { name, phone } = chosenBeliever
    const accountSid = 'AC9a08dbf09016f52c1649725892ea596c'
    const authToken = '61396e07ef4ae88d8ac13ef764aa87fb'

    const params = new URLSearchParams();
    params.append('To', `+351${phone}`);
    params.append('From', '+17174969522');
    params.append('Body', `Olá ${name}, temos um lugar livre para ti. Para aceitar ou recusar: ${baseUrl}/accept?code=${id}`)

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(accountSid + ':' + authToken).toString('base64')}`
    }

    Axios.post(smsEndpoint, params, { headers })
  }

  const confirmLend = async () => {

    const loansResponse = await Axios.post(dataEndpoint + '/loans', {
      owner_id: currentOwner.id,
      believer_id: chosenBeliever.id,
      start: moment(startDate).format('YYYY-MM-DD'),
      end: moment(endDate).format('YYYY-MM-DD')
    })
    const { id } = loansResponse.data.data;
    sendSMS(id);
    // sendEmail(id)
    Cookies.set('lugarlivre', currentOwner.id);
    setStep(4)
  }

  const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const getData = async () => {
    const ownersResponse = await Axios(dataEndpoint + '/owners?sort=name')
    ownersResponse.data.data.forEach(owner => owner.value = owner.name)
    const owners = ownersResponse.data.data
    setOwners(owners)

    // const loansResponse = await Axios(dataEndpoint + '/loans')
    // const loans = loansResponse.data.data
    // setLoans(loans)

    const believersResponse = await Axios(dataEndpoint + '/believers')
    const believers = believersResponse.data.data
    setBelievers(shuffle(believers))

    const ownerCookieId = Cookies.get('lugarlivre')
    const ownerCookie = owners.find(owner => owner.id === parseInt(ownerCookieId))
    if (ownerCookie) setCurrentOwner(ownerCookie)

    // setData(true)
    // setTimeout(() => {
    setStep(1)

    // }, 1200)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      {/* LOADING */}
      {
        step === 0 &&
        <Loading />
      }

      {/* STEP 1 */}
      {
        step === 1 &&
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
          handleBelieverChange={handleBelieverChange}
          handleNext={() => goToStep(3)}
          handleBack={() => goToStep(1)}
        />
      }

      {/* STEP 3 */}
      {
        step === 3 &&
        <Confirmation
          chosenBeliever={chosenBeliever}
          startDate={startDate}
          endDate={endDate}
          believers={believers}
          handleConfirmation={confirmLend}
          handleBack={() => goToStep(2)}
        />
      }

      {/* FINAL */}
      {
        step === 4 &&
        <Final
          currentOwner={currentOwner}
          chosenBeliever={chosenBeliever}
          startDate={startDate}
          endDate={endDate}
        />
      }
    </>
  )
}