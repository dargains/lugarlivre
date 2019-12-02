import React from 'react'
import styled from 'styled-components'

import Title from './Title'

const Loading = () => {
  return (
    <Container>
      <Title>Lugar Livre</Title>
      <h2>A carregar</h2>
    </Container>
  )
}

const Container = styled.section`
  text-align: center;
`;

export default Loading