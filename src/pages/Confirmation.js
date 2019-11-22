import React from 'react'
import moment from 'moment'

import Button from '../components/Button'

const Confirmation = ({ currentOwner, chosenBeliever, startDate, endDate, handleConfirmation }) => {
  return (
    <>
      <h2>Confirme a escolha</h2>
      <p>{currentOwner?.name} quer oferecer o lugar a {chosenBeliever.name} de {moment(startDate).format("DD MM YYYY")} até {moment(endDate).format("DD MM YYYY")}</p>
      <Button onClick={handleConfirmation}>Confirmar</Button>
      <Button>Voltar</Button>
    </>
  )
}

export default Confirmation;