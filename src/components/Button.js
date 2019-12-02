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
  width: 100%;
  max-width: 250px;
  display: block;
  padding: 16px 24px;
  margin: 16px auto;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  color: var(--neu-01);
  cursor: pointer;
	height: 72px;
	border-radius: 36px;
	background: linear-gradient(225deg, #FCD269 0%, #FDC862 20%, #FEBF5B 40%, #FFB554 60%, #FFAB4E 80%, #FFA147 100%);
  transform: translate3d(0,0,0);
  will-change: transform;
  transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-size: 16px;
  letter-spacing: 0.6px;
  line-height: 22px;
  text-transform: uppercase;
  &:hover {
    transform: translate3d(0,2px,0);
  }
`;

export default Button;