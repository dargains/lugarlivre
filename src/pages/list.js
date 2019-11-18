import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import 'reset-css'
import Header from '../components/Header';
import { LLProvider } from '../contexts/llContext'

import PersonList from '../components/PersonList'

const baseUrl = 'http://myeverydayapps.com/public/_/items'

const List = () => {

  const [owners, setOwners] = useState([]);
  const [believers, setBelievers] = useState([]);
  const [page, setPage] = useState([]);

  useEffect(() => {
    Axios(baseUrl + '/owners')
    .then(({data}) => {
      setOwners(data.data)
    })
    Axios(baseUrl + '/believers')
    .then(({data}) => {
      setBelievers(data.data)
    })
    Axios(baseUrl + '/module')
    .then(({data}) => {
      setBelievers(data.data)
    })
    Axios(baseUrl + '/page?fields=*.*.*')
    .then(({data}) => {
      setPage(data.data)
      console.log(data.data);
    })
  }, []);

  return (
    <div>
      <Header />
      <h1>Escolha uma pessoa</h1>
      <LLProvider value={{ baseUrl, owners, believers }}>
        <PersonList />
      </LLProvider>
    </div>
  )
}

export default List;