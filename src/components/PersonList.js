import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LLContext from '../contexts/llContext'

import PersonCard from '../components/PersonCard'

const PersonList = () => {
  const {cards} = useContext(LLContext);
  return (
    <List>
      {cards.map(card => <PersonCard key={card.id} {...card} />)}
    </List>
  )
}

const List = styled.ul`
  max-width: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
`;

PersonList.propTypes = {
  cards: PropTypes.array
}

export default PersonList
