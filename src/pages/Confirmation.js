import React from 'react'

import Button from '../components/Button'

const Confirmation = ({ currentOwner }) => {
  return (
    <>
      <h2>Confirme a escolha</h2>
      <p>{currentOwner?.name} quer oferecer o lugar </p>
      <Button>Continuar</Button>
      <Button>Voltar</Button>
    </>
  )
}

export default Confirmation;