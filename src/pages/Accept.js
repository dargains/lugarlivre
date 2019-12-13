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
  const [id, setId] = useState(null)
  const [startDateString, setStartDateString] = useState('')
  const [endDateString, setEndDateString] = useState('')
  const [isSameDay, setSameDay] = useState(false)
  const [color, setColor] = useState(`var(--m-0${Math.floor(Math.random() * 5) + 1})`)

  const sendEmail = (owner, believer, accepted) => {
    const message = accepted
      ? `<p>Olá ${owner.name}, ${believer.name} acaba de aceitar um lugar de garagem!</p><p>Vai ter com ele/a para combinar coisas.</p>`
      : `<p>Olá ${owner.name}. ${believer.name} acaba de recusar a tua oferta de lugar.</p><p>Clica <a href="https://lugarlivre.azurewebsites.net">aqui</a> para escolher outra pessoa.</p>`
    const data = JSON.stringify({
      "fromName": "Lugar Livre",
      "toEmail": owner.email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `[Lugar Livre] Oferta aceite`,
      "emailMessage": `<div style="font-family: sans-serif;">
        ${message}
      </div>`
    })

    Axios.post(emailEndpoint, data)
  }

  const sendSMS = (owner, believer, accepted) => {
    const accountSid = ''
    const authToken = ''
    const message = accepted ? `O teu lugar foi atribuído com sucesso.` : `O teu lugar continua livre. Podes atribuí-lo a outra pessoa.`
    const data = JSON.stringify({
      To: `+351${owner.phone}`,
      From: '+17345476775',
      Body: message
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
    const currentBeliever = believerResponse.data.data[0];
    setBeliever(currentBeliever)

    setStartDateString(moment(currentLoan.start).isSame(currentLoan.end, 'year') ? moment(currentLoan.start).isSame(currentLoan.end, 'month') ? moment(currentLoan.start).format('DD') : moment(currentLoan.start).format('DD [de] MMMM') : moment(currentLoan.start).format('DD [de] MMMM'));
    setEndDateString(moment(currentLoan.end).format("DD [de] MMMM"))
    setSameDay(moment(currentLoan.start).isSame(currentLoan.end))

  }

  const handleAccept = () => {
    sendEmail(owner, believer, false)
    if (owner.phone) sendSMS(owner, believer, false)

    Axios(dataEndpoint + `/loans/${id}`, {
      method: 'PATCH',
      data: {
        status: 'accepted'
      }
    })
  }
  const handleRefuse = () => {
    sendEmail(owner, believer, true)
    if (owner.phone) sendSMS(owner, believer, true)

    Axios(dataEndpoint + `/loans/${id}`, {
      method: 'PATCH',
      data: {
        status: 'refused'
      }
    })
  }

  useEffect(() => {
    const { search } = window.location;
    const id = parseInt(search.split('=')[1]);
    setId(id)
    getInfo(id)
  }, []);

  return (
    <Container backColor={color}>
      <Box>
        <span></span>
        <Body><strong>{believer.name}</strong><br /> temos um lugar livre <strong><br />{isSameDay ? `a ${endDateString}` : `de ${startDateString} a ${endDateString}`}</strong>.</Body>
        <Body>Edificio <strong>{owner.building}</strong></Body>
        <Body><strong>{owner.spot}</strong></Body>
        <span></span>
      </Box>
      <ButtonContainer>
        <Button white color={color} onClick={handleAccept}>Confirmar</Button>
        <AltButton white icon="close" onClick={handleRefuse} />
      </ButtonContainer>
    </Container >
  )
}

const Box = styled.div`
  margin: 80px auto 60px;
  max-width: 260px;
  span:nth-of-type(1),
  span:nth-of-type(2) {
    position: absolute;
    width: 24px;
    height: 48px;
    top: 50%;
    left: 50%;
    &:before,
    &:after {
      content: '';
      background-color: var(--neu-01);
      position: absolute;
    }
    &:before {
      width: 8px;
      height: 100%;
    }
    &:after {
      width: 100%;
      height: 8px;
    }
  }
  span:nth-of-type(1) {
    transform: translate3d(-23%,-9%,0);
    animation: openTopRightBracket .5s cubic-bezier(0.175, 0.885, 0.32, 1.4) .5s forwards;
    &:before,
    &:after {
      top: 0;
      right: -10%;
    }
  }
  span:nth-of-type(2) {
    transform: translate3d(-77%,-7%,0);
    animation: openBottomLeftBracket .5s cubic-bezier(0.175, 0.885, 0.32, 1.4) .5s forwards;
    &:before,
    &:after {
      bottom: 0;
      left: 0;
    }
  }
`;

const Body = styled.p`
  margin: 0 auto 10px;
  /* padding: 0 40px; */
  font-size: 22px;
  line-height: 36px;
  letter-spacing: -0.73px;
  color: var(--neu-01);
  opacity: 0;
  animation: fadeIn .5s ease-in-out .8s forwards;
  max-width: 244px;
`;

export default AcceptScreen
