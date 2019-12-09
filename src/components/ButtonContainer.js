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
  opacity: 0;
  transform: scale(0.7);
  animation: fadeIn .2s cubic-bezier(0.175, 0.885, 0.32, 1.4) .8s forwards;
`;

export default ButtonContainer