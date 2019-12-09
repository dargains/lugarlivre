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
`;

export default Title
