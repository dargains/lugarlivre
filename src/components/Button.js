import React from 'react'
import styled from 'styled-components'

const Button = ({ children, handleClick, primary, white, color }) => {
  return (
    <BTN onClick={handleClick} primary={primary} white={white} color={color}>
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
  color: ${props => props.white ? `var(--m-0${props.color})` : 'var(--neu-01)'};
  cursor: pointer;
	height: 72px;
	border-radius: 36px;
  font-size: 16px;
  letter-spacing: 0.6px;
  line-height: 22px;
  text-transform: uppercase;
  background-color: ${props => props.white ? 'var(--neu-01)' : props.primary ? 'var(--m-01)' : 'var(--m-02)'};
  @media (min-width: 0) and (max-width: 340px) {
		height: auto;
	}
`;

export default Button;