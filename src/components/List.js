import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PersonCard from './PersonCard'
import Button from './Button'
import AltButton from './AltButton'

const List = ({ believers, chosenBeliever, handleBelieverChange, handleNext, handleBack }) => {
  const [showError, setShowError] = useState(false)
  const isChosen = id => chosenBeliever?.id === id
  const choosePerson = id => {
    setShowError(false)
    handleBelieverChange(id)
    handleNext();
  }
  const chooseRandom = () => {
    const randomId = believers[Math.floor(Math.random() * believers.length)];
    choosePerson(randomId.id)
  }
  return (
    <Container>
      <PersonList>
        {believers.map(card => <PersonCard key={card.id} {...card} handleBelieverChange={choosePerson} isChosen={isChosen(card.id)} />)}
      </PersonList>

      <Error className={showError ? 'show' : ''}>Falta escolher a pessoa</Error>

      <Button handleClick={chooseRandom}>Random</Button>
      {/* <Button handleClick={goToNext}>Continuar</Button> */}
      <AltButton handleClick={handleBack}>Voltar</AltButton>
    </Container>
  )
}

const Container = styled.article`
  text-align: center;
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

const Error = styled.span`
  opacity: 0;
  color: var(--m-02);
  font-size: 0.8em;
  transition: opacity .2s ease;
  &.show {
    opacity: 1;
  }
`;

PersonList.propTypes = {
  believers: PropTypes.array
}

export default List;