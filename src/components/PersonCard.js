import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LLContext from '../contexts/llContext'

import Axios from 'axios'

const emailEndpoint = 'https://functionstestlogs.azurewebsites.net/api/SendEmail?code=1k9alxFBsZFlF0mHUlV/1wG58CLO0Xo79aoAZOh4af1p1SWi3fkCgQ==';


const PersonCard = ({id, name, email, available, department}) => {
  const {baseUrl} = useContext(LLContext);
  const handleClick = () => {

      const data = JSON.stringify({
        "toEmail": email,
        "fromEmail": "lugar.livre@fullsix.pt",
        "emailSubject": `Olá ${name}, alguém acaba de oferecer-lhe um lugar de garagem!`,
        "emailMessage": "Hey, tens um lugar de garagem!"
      })
    
      
      Axios.post(emailEndpoint, data )
      .then(response => {
        console.log(response);
      })
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
