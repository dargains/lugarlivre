import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import moment from 'moment'

import Button from '../components/Button'

const AcceptScreen = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  const [owner, setOwner] = useState({})
  const [loan, setLoan] = useState({})
  const getInfo = async id => {
    const loanResponse = await Axios(baseUrl + `/loans?filter[id][eq]=${id}`);
    const currentLoan = loanResponse.data.data[0];
    setLoan(currentLoan);
    const ownerId = currentLoan.owner_id;
    const ownerResponse = await Axios(baseUrl + `/owners?filter[id][eq]=${ownerId}`);
    const currentOwner = ownerResponse.data.data[0];
    setOwner(currentOwner);
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
  }, [])
  return (
    <Container>
      <Title>Lugar livre</Title>
      <Subtitle>Parabéns!</Subtitle>
      <Body>Tens um lugar reservado para ti.</Body>
      <Box>
        <Body>De <span>{moment(loan?.start).format('LL')}</span> a <span>{moment(loan?.end).format('LL')}</span>.</Body>
        <Body>Edificio <span>{owner?.building}</span></Body>
        <Body><span>{owner?.spot}</span></Body>
      </Box>
      <Button>Guardar</Button>
    </Container>
  )
}

const Container = styled.main`
  width: 90%;
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0,0,0,.2);
  text-align: center;
`;
const Box = styled.main`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 40px;
`;
const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;
const Body = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
  line-height: 1.2em;
  span {
    color: var(--m-01);
  }
`;

export default AcceptScreen
