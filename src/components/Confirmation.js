import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import Container from '../components/Container'
import ButtonContainer from '../components/ButtonContainer'
import Button from '../components/Button'
import AltButton from './AltButton'

const Confirmation = ({ chosenBeliever, startDate, endDate, believers, handleConfirmation, handleBack }) => {

  const isSame = moment(startDate).isSame(endDate)

  const today = moment();
  const tomorrow = moment().add(1, 'day');
  const isToday = today.isSame(startDate, 'd') && today.isSame(endDate, 'd')
  const isTomorrow = tomorrow.isSame(startDate, 'd') && tomorrow.isSame(endDate, 'd')

  const startDateString = moment(startDate).isSame(endDate, 'year') ? moment(startDate).isSame(endDate, 'month') ? moment(startDate).format('DD') : moment(startDate).format('DD [de] MMMM') : moment(startDate).format('DD [de] MMMM')

  const endDateString = moment(endDate).format("DD [de] MMMM")

  const backColor = believers.indexOf(chosenBeliever) % 5 + 1

  return (
    <Container backColor={`var(--m-0${backColor})`}>
      <Body>
        <span></span>
        <p>O teu lugar está livre<br /><strong>{isToday ? 'hoje' : isTomorrow ? 'amanhã' : isSame ? `a ${startDate.format("DD [de] MMMM")}` : `de ${startDateString} a ${endDateString}`}</strong> e será partilhado com <strong>{chosenBeliever.name}</strong></p>
        <span></span>
      </Body>
      <ButtonContainer>
        <Button white color={`var(--m-0${backColor})`} handleClick={handleConfirmation}>Confirmar</Button>
        <AltButton white handleClick={handleBack} icon="arrow_back" />
      </ButtonContainer>
    </Container>
  )
}

const Body = styled.div`
  max-width: 262px;
  margin: 40px auto 0;
  text-align: center;
  padding: 60px 24px;
  p {
    font-size: 22px;
    line-height: 36px;
    letter-spacing: -0.8px;
    color: var(--neu-01);
    opacity: 0;
    animation: fadeIn .2s cubic-bezier(0.175, 0.885, 0.32, 1.4) .4s forwards;
  }
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
    animation: openTopRightBracket .5s cubic-bezier(0.175, 0.885, 0.32, 1.4) forwards;
    &:before,
    &:after {
      top: 0;
      right: 0;
    }
  }
  span:nth-of-type(2) {
    transform: translate3d(-77%,-7%,0);
    animation: openBottomLeftBracket .5s cubic-bezier(0.175, 0.885, 0.32, 1.4) forwards;
    &:before,
    &:after {
      bottom: 0;
      left: 0;
    }
  }
`;

export default Confirmation;