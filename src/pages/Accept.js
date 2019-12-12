import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import moment from 'moment'

import { dataEndpoint, smsEndpoint, emailEndpoint } from '../helpers/endpoints'

import Container from '../components/Container'
import ButtonContainer from '../components/ButtonContainer'
import Button from '../components/Button'
import AltButton from '../components/AltButton'

const AcceptScreen = () => {
  const [owner, setOwner] = useState({})
  const [believer, setBeliever] = useState({})
  const [loan, setLoan] = useState({})
  const [startDateString, setStartDateString] = useState('')
  const [endDateString, setEndDateString] = useState('')
  const [isSameDay, setSameDay] = useState(false)

  const sendEmail = () => {
    const data = JSON.stringify({
      "fromName": "Lugar Livre",
      "toEmail": owner.email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `[Lugar Livre] Oferta aceite`,
      "emailMessage": `<div style="font-family: sans-serif;">
      <p>Olá ${owner.name}, ${believer.name} acaba de aceitar um lugar de garagem!</p>
      <p>Vai ter com ele/a para combinar coisas.</p>
      </div>`
    })
    console.log(data);
    // Axios.post(emailEndpoint, data)
  }

  const sendSMS = () => {
    const { name, phone } = owner
    const accountSid = ''
    const authToken = ''
    const data = JSON.stringify({
      To: `+351${phone}`,
      From: '+17345476775',
      Body: `Obrigado, ${name}. O lugar foi aceite.`
    })
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(accountSid + ':' + authToken).toString('base64')}`
    }
    Axios.post(smsEndpoint, data, { headers: { Authorization: `Basic AC43e03b4c673010868acc52eb0e44d08f` } })
  }

  const getInfo = async id => {
    const loanResponse = await Axios(dataEndpoint + `/loans?filter[id][eq]=${id}`);
    const currentLoan = loanResponse.data.data[0];
    setLoan(currentLoan);
    const ownerId = currentLoan.owner_id;
    const believerId = currentLoan.believer_id;

    const ownerResponse = await Axios(dataEndpoint + `/owners?filter[id][eq]=${ownerId}`);
    const currentOwner = ownerResponse.data.data[0];
    setOwner(currentOwner);

    const believerResponse = await Axios(dataEndpoint + `/believers?filter[id][eq]=${believerId}`);
    const currentbeliever = believerResponse.data.data[0];
    setBeliever(currentbeliever)

    setStartDateString(moment(currentLoan.start).isSame(currentLoan.end, 'year') ? moment(currentLoan.start).isSame(currentLoan.end, 'month') ? moment(currentLoan.start).format('DD') : moment(currentLoan.start).format('DD [de] MMMM') : moment(currentLoan.start).format('DD [de] MMMM [de] YYYY'));
    setEndDateString(moment(currentLoan.end).format("DD [de] MMMM [de] YYYY"))
    setSameDay(moment(currentLoan.start).isSame(currentLoan.end))

    sendEmail()
    if (currentOwner.phone) sendSMS()
  }

  useEffect(() => {
    const { search } = window.location;
    const id = parseInt(search.split('=')[1]);
    getInfo(id)
    Axios(dataEndpoint + `/loans/${id}`, {
      method: 'PATCH',
      data: {
        status: 'accepted'
      }
    })
  }, []);

  return (
    <Container backColor="var(--m-05)">
      <Body>Tens um lugar reservado para ti.</Body>
      <Box>
        <Body><strong>{believer.name}</strong> temos um lugar livre <strong>{isSameDay ? `${endDateString}` : `De ${startDateString} a ${endDateString}`}</strong>.</Body>
        <Body>Edificio {owner?.building}</Body>
        <Body>{owner?.spot}</Body>
        <Body>Estás interessado(a)?</Body>
      </Box>
      <ButtonContainer>
        <Button white color="var(--m-05)">Confirmar</Button>
        <AltButton white icon="close" />
      </ButtonContainer>
    </Container >
  )
}

const Box = styled.div`
  margin: 20px 0 60px;
`;

const Body = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
  line-height: 1.2em;
  color: var(--neu-01);
`;

export default AcceptScreen
