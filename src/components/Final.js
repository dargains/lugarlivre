import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import moment from 'moment'

import Button from '../components/Button'

const Final = ({ currentOwner, chosenBeliever, startDate, endDate }) => {
  const [startDateString, setStartDateString] = useState('')
  const [endDateString, setEndDateString] = useState('')
  const [isSameDay, setSameDay] = useState(false)

  useEffect(() => {
    setStartDateString(moment(startDate).isSame(endDate, 'year') ? moment(startDate).isSame(endDate, 'month') ? moment(startDate).format('DD') : moment(startDate).format('DD [de] MMMM') : moment(startDate).format('DD [de] MMMM [de] YYYY'));
    setEndDateString(moment(endDate).format("DD [de] MMMM [de] YYYY"))
    setSameDay(moment(startDate).isSame(endDate))
  }, []);

  return (
    <Container>
      <Title>Lugar livre</Title>
      <Subtitle>Obrigado, {currentOwner.name}!</Subtitle>
      <Body>{chosenBeliever.name} já não precisa mais deixar o carro no Oeiras Parque.</Body>
      <Box>
        <Body>{isSameDay ? `${endDateString}` : `De ${startDateString} a ${endDateString}`}</Body>
        <Body>Edificio {currentOwner.building}</Body>
        <Body>{currentOwner.spot}</Body>
      </Box>
    </Container >
  )
}

const Container = styled.section`
  width: 90%;
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0,0,0,.2);
  text-align: center;
`;
const Box = styled.div`
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 40px;
`;
const Subtitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 20px;
`;
const Body = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
  line-height: 1.2em;
`;

export default Final
