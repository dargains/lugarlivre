import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PersonCard from './PersonCard'
import Button from './Button'

const List = ({ believers, chosenBeliever, handleBelieverChange, handleNext, handleBack }) => {
  const isChosen = id => chosenBeliever?.id === id
  const chooseRandom = () => {
    const randomId = believers[Math.floor(Math.random() * believers.length)];
    handleBelieverChange(randomId.id)
  }
  return (
    <Container>
      <Subtitle>Partilha o teu lugar de estacionamento</Subtitle>
      <PersonList>
        {believers.map(card => <PersonCard key={card.id} {...card} handleBelieverChange={handleBelieverChange} isChosen={isChosen(card.id)} />)}
      </PersonList>
      <Button handleClick={chooseRandom}>Random</Button>
      <Button handleClick={handleNext}>Continuar</Button>
      <Button handleClick={handleBack}>Voltar</Button>
    </Container>
  )
}

const Container = styled.article`
  text-align: center;
`;

const Subtitle = styled.h2`
  margin: 20px 0 80px;
  font-size: 18px;
  font-weight: normal;
`;

const PersonList = styled.ul`
  max-width: 800px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
  list-style: none;
`;

PersonList.propTypes = {
  believers: PropTypes.array
}

export default List;