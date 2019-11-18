import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LLContext from '../contexts/llContext'

import Axios from 'axios'

const emailEndpoint = 'https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/v3/mail/send';
const headers = {
  'Authorization': 'Bearer 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',
  'Content-Type': 'application/json'
};


const PersonCard = ({id, name, email, available, department}) => {
  const {baseUrl} = useContext(LLContext);
  const handleClick = () => {
    
      // TODO send email
      const data = {"personalizations": [{"to": [{"email": email}]}],"from": {"email": "lugarlivref6@gmail.com"},"subject": "Tens um lugar de garagem!","content": [{"type": "text/plain", "value": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`}]}
      
      Axios.post(emailEndpoint, data, {headers} )
      .then(response => {
        console.log(response);
      })
      Axios.post(baseUrl + )
  }
  return (
    <Card onClick={handleClick} data-available={available}>
      <Title>{name}</Title>
      <p>{department}</p>
    </Card>
  )
}
const Card = styled.li`
  padding: 20px;
  box-shadow: 2px 2px 20px rgba(0,0,0,.2);
  border-radius: 5px;
  cursor: pointer;
  &[data-available="false"] {
    opacity: .3;
  }
`;
const Title = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

PersonCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  avaiable: PropTypes.bool,
  department: PropTypes.string
}

export default PersonCard
