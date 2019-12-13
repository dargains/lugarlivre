import React from 'react'
import styled from 'styled-components'

function Title() {
  return (
    <H1>
      Lugar Livre
    </H1>
  )
}

const H1 = styled.h1`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 700;
  line-height: 27px;
  text-align: center;
  text-transform: uppercase;
  opacity: 0;
  transform: scale(0.7);
  animation: fadeInGrow .2s cubic-bezier(0.175, 0.885, 0.32, 1.4) .4s forwards;
`;

export default Title