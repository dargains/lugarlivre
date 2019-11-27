import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const PersonCard = ({ id, name, department, isChosen, handleBelieverChange }) => {
  const handleClick = () => {
    handleBelieverChange(id)
  }
  return (
    <Card onClick={handleClick} className={`${isChosen ? 'selected' : ''}`}>
      <Title>{name}</Title>
      <p>{department}</p>
    </Card>
  )
}
const Card = styled.li`
  padding: 20px;
  box-shadow: 2px 2px 20px rgba(0,0,0,.2);
  border-radius: 5px;
  cursor: pointer;
  &.selected {
    background-color: #ededed;
  }
`;
const Title = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

PersonCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  department: PropTypes.string
}

export default PersonCard
