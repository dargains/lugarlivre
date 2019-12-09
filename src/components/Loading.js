import React from 'react'
import styled from 'styled-components'

import Container from './Container'
import Title from './Title'
import logo from '../images/Logo.svg'

const Loading = () => {
  return (
    <Container>
      <LogoComp>
        <img src={logo} alt="Lugar Livre" />
      </LogoComp>
      <Title>Lugar Livre</Title>
      <h2>A carregar</h2>
    </Container>
  )
}

const LogoComp = styled.figure`
  max-width: 40px;
  margin: 0 auto 12px;
`;

export default Loading