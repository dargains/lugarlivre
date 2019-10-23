import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PersonCard = ({id, name, email, available, department}) => {
  const handleClick = ({currentTarget}) => {
    console.log(currentTarget.dataset.personId);
    const {personId} = currentTarget.dataset;
    // TODO fazer toggle do available
  }
  return (
    <Card onClick={handleClick} data-person-id={id} data-available={available}>
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
  &[data-available="false"] {
    opacity: .3;
    pointer-events: none;
  }
`;
const Title = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

PersonCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  avaiable: PropTypes.bool,
  department: PropTypes.string
}

export default PersonCard
