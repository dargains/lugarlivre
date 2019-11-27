import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PersonCard from './PersonCard'
import Button from './Button'

const List = ({ believers, chosenBeliever, handleBelieverChange, handleNext, handleBack, isActive }) => {
  const isChosen = id => chosenBeliever?.id === id
  const chooseRandom = () => {
    const randomId = believers[Math.floor(Math.random() * believers.length)];
    handleBelieverChange(randomId.id)
  }
  return (
    <main style={{ opacity: isActive ? 1 : '0.5' }}>
      <h2>Escolha uma pessoa</h2>
      <PersonList>
        {believers.map(card => <PersonCard key={card.id} {...card} handleBelieverChange={handleBelieverChange} isChosen={isChosen(card.id)} />)}
      </PersonList>
      <Button handleClick={chooseRandom}>Random</Button>
      <Button handleClick={handleNext}>Confirmar</Button>
      <Button handleClick={handleBack}>Voltar</Button>
    </main>
  )
}
const PersonList = styled.ul`
  max-width: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  list-style: none;
`;

PersonList.propTypes = {
  believers: PropTypes.array
}

export default List;