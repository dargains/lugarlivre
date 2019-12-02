import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const PersonCard = ({ id, name, department, isChosen, handleBelieverChange }) => {
  const handleClick = () => {
    handleBelieverChange(id)
  }
  return (
    <Card onClick={handleClick} className={`${isChosen ? 'selected swiper-slide' : 'swiper-slide'}`}>
      <Title>{name}</Title>
      <Subtitle>{department}</Subtitle>
    </Card>
  )
}
const Card = styled.article`
  cursor: pointer;
  padding: 60px 16px;
  border-radius: 7px;
  text-align: left;
	background: linear-gradient(225deg, #FCD269 0%, #FDC862 20%, #FEBF5B 40%, #FFB554 60%, #FFAB4E 80%, #FFA147 100%);
`;
const Title = styled.h2`
  color: var(--neu-01);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.67px;
  line-height: 27px;
`;
const Subtitle = styled.h3`
  color: var(--neu-01);
  font-size: 16px;
  line-height: 22px;
  font-weight: normal;
`;

PersonCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  department: PropTypes.string
}

export default PersonCard
