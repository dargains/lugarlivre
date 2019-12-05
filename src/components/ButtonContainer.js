import React from 'react'
import styled from 'styled-components'

const ButtonContainer = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
`;

export default ButtonContainer