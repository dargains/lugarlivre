import React, { useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'

const RefuseScreen = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  useEffect(() => {
    const { search } = window.location;
    const id = parseInt(search.split('=')[1]);
    Axios(baseUrl + `/loans/${id}`, {
      method: 'PATCH',
      data: {
        status: 'refused'
      }
    }).then(response => {
      console.log(response);
    })
  }, [])
  return (
    <Container>
      <Title>Lugar Livre</Title>
      <Subtitle>Temos pena!</Subtitle>
      <Body>Vamos atribuir o lugar a outra pessoa.</Body>
    </Container>
  )
}

const Container = styled.main`
  width: 90%;
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0,0,0,.2);
  text-align: center;
`;
const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 40px;
`;
const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;
const Body = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
  line-height: 1.2em;
  span {
    color: var(--m-01);
  }
`;

export default RefuseScreen