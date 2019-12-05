import React from 'react'
import styled from 'styled-components'

const AltButton = ({ children, handleClick, isActive, white }) => {
  return (
    <BTN onClick={handleClick} white={white}>
      {children}
    </BTN>
  )
}

const BTN = styled.button`
  color: ${props => props.white ? 'var(--neu-01)' : 'var(--m-01)'};
  padding: 8px 16px;
  border-radius: 4px;
  margin: 5px auto;
  max-width: 200px;
  display: block;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 1em;
  cursor: pointer;
  background-color: transparent;
`;

export default AltButton;