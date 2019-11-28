import React from 'react'
import styled from 'styled-components'

const Button = ({ children, handleClick }) => {
  return (
    <BTN onClick={handleClick}>
      {children}
    </BTN>
  )
}

const BTN = styled.button`
  background-color: var(--m-01);
  border-radius: 4px;
  width: 100%;
  max-width: 200px;
  display: block;
  padding: 16px 0;
  margin: 10px auto;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  color: var(--neu-01);
  font-size: 20px;
  line-height: 27px;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(0,0,0,.2);
`;

export default Button;