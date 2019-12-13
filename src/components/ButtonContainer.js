import React from 'react'
import styled, { css } from 'styled-components'

const ButtonContainer = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const createCSS = () => {
  let styles = '';

  for (let i = 0; i < 20; i += 1) {
    styles += `
     > *:nth-child(${i}) {
        opacity: 0;
        transform: scale(0.7);
        animation: fadeInGrow .2s cubic-bezier(0.175, 0.885, 0.32, 1.4) forwards;
         animation-delay: ${.8 + (i) / 10}s;
       }
     `
  }

  return css`${styles}`;
}

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  ${createCSS()};
`;

export default ButtonContainer