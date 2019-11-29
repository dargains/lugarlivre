import React from 'react'
import moment from 'moment'

import Button from '../components/Button'

const Confirmation = ({ currentOwner, chosenBeliever, startDate, endDate, handleConfirmation, handleBack }) => {
  return (
    <article>
      <h2>Confirme a escolha</h2>
      <p>{currentOwner?.name} quer oferecer o lugar a {chosenBeliever.name} de {moment(startDate).format("DD [de] MMMM")} até {moment(endDate).format("DD [de] MMMM")}</p>
      <Button handleClick={handleConfirmation}>Confirmar</Button>
      <Button handleClick={handleBack}>Voltar</Button>
    </article>
  )
}

export default Confirmation;