import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const AltButton = ({ handleClick, icon, white }) => {
  return (
    <BTN onClick={handleClick} white={white}>
      <i className="material-icons">{icon}</i>
    </BTN>
  )
}

const BTN = styled.button`
  color: ${props => props.white ? 'var(--neu-01)' : 'var(--neu-05)'};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 5px auto;
  max-width: 200px;
  display: block;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  i {
    font-size: 32px;
  }
  @media (min-width: 0) and (max-width: 340px) {
    width: 48px;
    height: 48px;
	}
`;

AltButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  white: PropTypes.bool
}

export default AltButton;