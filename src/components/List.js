import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PersonCard from './PersonCard'
import Button from './Button'

const List = ({ believers, chosenBeliever, handleBelieverChange }) => {
  const isChosen = id => chosenBeliever?.id === id
  return (
    <>
      <h2>Escolha uma pessoa</h2>
      <PersonList>
        {believers.map(card => <PersonCard key={card.id} {...card} handleBelieverChange={handleBelieverChange} isChosen={isChosen(card.id)} />)}
      </PersonList>
      <Button>Random</Button>
      <Button>Confirmar</Button>
      <Button>Voltar</Button>
    </>
  )
}
const PersonList = styled.ul`
  max-width: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
`;

PersonList.propTypes = {
  believers: PropTypes.array
}

export default List;