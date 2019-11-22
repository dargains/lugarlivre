import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PersonCard from '../components/PersonCard'

const List = ({ believers }) => {

  return (
    <>
      <h1>Escolha uma pessoa</h1>
      <PersonList>
        {believers.map(card => <PersonCard key={card.id} {...card} />)}
      </PersonList>
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