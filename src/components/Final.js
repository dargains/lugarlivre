import React, { useEffect } from 'react'
import styled from 'styled-components'
import Parallax from 'parallax-js'

import Container from './Container'
import cloud1 from '../images/Cloud 01.svg'
import cloud2 from '../images/Cloud 02.svg'
import cloud3 from '../images/Cloud 03.svg'

const Final = () => {
  useEffect(() => {
    var scene = document.querySelector('.scene');
    new Parallax(scene);
  }, [])
  return (
    <Container backColor="var(--m-02)">
      <ImageContainer className="scene">
        <img src={cloud1} alt="cloud" data-depth="0.4" />
        <img src={cloud2} alt="cloud" data-depth="0.8" />
        <img src={cloud3} alt="cloud" data-depth="0.2" />
      </ImageContainer>
      <Box>
        <Subtitle>Obrigado!</Subtitle>
        <Body>Acabaste de ganhar um lugar no céu</Body>
      </Box>
    </Container >
  )
}

const Box = styled.article`
  color: var(--neu-01);
  font-size: 1.375em;
  line-height: 36px;
  max-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  `;
const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    
    &:nth-of-type(1) {
      width: 135px;
      top: 20% !important;
      left: 20% !important;
    }
    &:nth-of-type(2) {
      width: 184px;
      top: 50% !important;
      left: 70% !important;
    }
    &:nth-of-type(3) {
      width: 56px;
      top: 70% !important;
      left: 20% !important;
    }
  }
`;

const Subtitle = styled.h2`
  font-weight: 700;
`;
const Body = styled.p`
  margin-bottom: 10px;
`;

export default Final
