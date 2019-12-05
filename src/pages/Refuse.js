import React, { useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'

const RefuseScreen = () => {
  const baseUrl = 'http://myeverydayapps.com/public/_/items'
  const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ=='

  const sendEmail = (owner, believer) => {
    const data = JSON.stringify({
      "fromName": "Lugar Livre",
      "toEmail": owner.email,
      "fromEmail": "lugar.livre@fullsix.pt",
      "emailSubject": `[Lugar Livre] Oferta recusada`,
      "emailMessage": `<div style="font-family: sans-serif;">
      <p>Olá ${owner.name}. ${believer.name} acaba de recusar a tua oferta de lugar.</p>
      <p>Clica <a href="http://localhost:3000">aqui</a> para escolher outra pessoa.</p>
      </div>`
    })

    Axios.post(emailEndpoint, data)
  }
  const getInfo = async id => {
    const loanResponse = await Axios(baseUrl + `/loans?filter[id][eq]=${id}`);
    const currentLoan = loanResponse.data.data[0];

    const ownerId = currentLoan.owner_id;
    const believerId = currentLoan.believer_id;

    const ownerResponse = await Axios(baseUrl + `/owners?filter[id][eq]=${ownerId}`);
    const currentOwner = ownerResponse.data.data[0];

    const believerResponse = await Axios(baseUrl + `/believers?filter[id][eq]=${believerId}`);
    const currentbeliever = believerResponse.data.data[0];

    sendEmail(currentOwner, currentbeliever)
  }

  useEffect(() => {
    const { search } = window.location;
    const id = parseInt(search.split('=')[1]);
    getInfo(id)
    Axios(baseUrl + `/loans/${id}`, {
      method: 'PATCH',
      data: {
        status: 'refused'
      }
    })
  }, []);

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