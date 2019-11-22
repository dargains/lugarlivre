import React from 'react'

import PersonList from '../components/PersonList'
import Confirmation from '../components/Confirmation'


const List = () => {

  return (
    <>
      <h1>Escolha uma pessoa</h1>
      <PersonList />
      <Confirmation />
    </>
  )
}

export default List;