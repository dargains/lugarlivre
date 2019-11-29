import React from 'react'
import styled from 'styled-components'

const AltButton = ({ children, handleClick, isActive }) => {
  return (
    <BTN onClick={handleClick} className={`${isActive ? 'active' : ''}`}>
      {children}
    </BTN>
  )
}

const BTN = styled.button`
  color: var(--m-01);
  padding: 8px 16px;
  border-radius: 4px;
  margin: 0 auto;
  max-width: 200px;
  display: block;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 1em;
  cursor: pointer;
  background-color: transparent;
  transition: background-color .2s ease-in-out;
  &:hover {
    background-color: var(--neu-02);
  }
  &.active {
    background-color: var(--neu-03);
  }
`;

export default AltButton;