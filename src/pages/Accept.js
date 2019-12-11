import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import moment from 'moment'

import Container from '../components/Container'
import ButtonContainer from '../components/ButtonContainer'
import Button from '../components/Button'
import AltButton from '../components/AltButton'

const AcceptScreen = () => {
  const baseUrl = 'https://myeverydayapps.com/public/_/items'
  const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ=='
  const [owner, setOwner] = useState({})
  const [believer, setBeliever] = useState({})
  const [loan, setLoan] = useState({})
  const [startDateString, setStartDateString] = useState('')
  const [endDateString, setEndDateString] = useState('')
  const [isSameDay, setSameDay] = useState(false)

  const sendEmail = (owner, believer) => {
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

    // Axios.post(emailEndpoint, data)
  }
  const getInfo = async id => {
    const loanResponse = await Axios(baseUrl + `/loans?filter[id][eq]=${id}`);
    const currentLoan = loanResponse.data.data[0];
    setLoan(currentLoan);
    const ownerId = currentLoan.owner_id;
    const believerId = currentLoan.believer_id;

    const ownerResponse = await Axios(baseUrl + `/owners?filter[id][eq]=${ownerId}`);
    const currentOwner = ownerResponse.data.data[0];
    setOwner(currentOwner);

    const believerResponse = await Axios(baseUrl + `/believers?filter[id][eq]=${believerId}`);
    const currentbeliever = believerResponse.data.data[0];
    setBeliever(currentbeliever)

    setStartDateString(moment(currentLoan.start).isSame(currentLoan.end, 'year') ? moment(currentLoan.start).isSame(currentLoan.end, 'month') ? moment(currentLoan.start).format('DD') : moment(currentLoan.start).format('DD [de] MMMM') : moment(currentLoan.start).format('DD [de] MMMM [de] YYYY'));
    setEndDateString(moment(currentLoan.end).format("DD [de] MMMM [de] YYYY"))
    setSameDay(moment(currentLoan.start).isSame(currentLoan.end))

    sendEmail(currentOwner, currentbeliever)
  }

  useEffect(() => {
    const { search } = window.location;
    const id = parseInt(search.split('=')[1]);
    getInfo(id)
    Axios(baseUrl + `/loans/${id}`, {
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
