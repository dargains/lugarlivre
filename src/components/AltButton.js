import React from 'react'
import styled from 'styled-components'

const AltButton = ({ children, handleClick }) => {
  return (
    <BTN onClick={handleClick}>
      {children}
    </BTN>
  )
}

const BTN = styled.button`
  color: var(--m-01);
  padding: 16px 0;
  margin: 0 5px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  cursor: pointer;
  &:hover {
    opacity: .7;
  }
`;

export default AltButton;