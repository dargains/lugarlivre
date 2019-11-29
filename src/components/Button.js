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
  border-radius: 30px;
  width: 100%;
  max-width: 200px;
  display: block;
  padding: 16px 24px;
  margin: 10px auto;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  color: var(--neu-01);
  font-size: 20px;
  line-height: 27px;
  cursor: pointer;
  transform: translate3d(0,0,0);
  will-change: transform;
  transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transform: translate3d(0,2px,0);
  }
`;

export default Button;