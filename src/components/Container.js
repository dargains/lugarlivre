import React from 'react'
import styled from 'styled-components'

const Container = ({ children, backColor }) => {
  return (
    <Section style={{ backgroundColor: backColor }}>
      {children}
    </Section>
  )
}

const Section = styled.section`
  background-color: ${props => props.theme.background};
`;

export default Container