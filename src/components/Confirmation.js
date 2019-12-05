import React from 'react'
import moment from 'moment'

import ButtonContainer from '../components/ButtonContainer'
import Button from '../components/Button'
import AltButton from './AltButton'

const Confirmation = ({ currentOwner, chosenBeliever, startDate, endDate, believers, handleConfirmation, handleBack }) => {

  const isSame = moment(startDate).isSame(endDate)
  const startDateString = moment(startDate).isSame(endDate, 'year') ? moment(startDate).isSame(endDate, 'month') ? moment(startDate).format('DD') : moment(startDate).format('DD [de] MMMM') : moment(startDate).format('DD [de] MMMM [de] YYYY');
  const endDateString = moment(endDate).format("DD [de] MMMM [de] YYYY");
  const backColor = () => believers.indexOf(chosenBeliever) + 1

  return (
    <article style={{ backgroundColor: `var(--m-0${backColor()})` }}>
      <h2>Confirme a escolha</h2>
      <p>{currentOwner?.name} quer oferecer o lugar a {chosenBeliever.name} {isSame ? `em ${startDate.format("DD [de] MMMM [de] YYYY")}` : `de ${startDateString} a ${endDateString}`}</p>
      <ButtonContainer>
        <Button white color={backColor()} handleClick={handleConfirmation}>Confirmar</Button>
        <AltButton handleClick={handleBack}>Voltar</AltButton>
      </ButtonContainer>
    </article>
  )
}

export default Confirmation;