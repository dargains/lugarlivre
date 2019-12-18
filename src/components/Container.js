import React from 'react'
import PropTypes from 'prop-types'
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

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  backColor: PropTypes.string
}

export default Container