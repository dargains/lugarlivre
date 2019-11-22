//import React, { useState } from 'react'
import React from 'react'
import Search from 'react-search';


import Button from '../components/Button'

const Home = ({ owners, currentOwner, handleOwnerChange }) => {

  const selectOwner = (items) => {
    handleOwnerChange(items[0])
  }
  const handleKey = (e) => {
    console.log(e)
  }
  return (
    <>
      <h1>home</h1>
      <h2>Tu és o {!!currentOwner && currentOwner.value}</h2>
      <Search items={owners}
        placeholder='O teu nome'
        maxSelected={1}
        NotFoundPlaceholder="Nenhum nome correspondente"
        onKeyChange={handleKey}
        onItemsChanged={selectOwner} />
      {/* https://github.com/airbnb/react-dates */}
      <p>datas</p>
      <Button to='/list'>continuar</Button>
    </>
  );
}

export default Home