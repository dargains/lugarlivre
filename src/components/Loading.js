import React from 'react'
import styled from 'styled-components'

import Container from './Container'
import logoGif from '../images/Logo.gif'

const Loading = () => {
  return (
    <Container>
      <Box>
        <LogoComp>
          <img src={logoGif} alt="Lugar Livre" />
        </LogoComp>
      </Box>
    </Container>
  )
}

const Box = styled.figure`
height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoComp = styled.figure`
  max-width: 80px;
  margin: 0 auto;
`;

export default Loading