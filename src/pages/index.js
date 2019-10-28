import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import loadFirebase from '../firebase'
import { LLProvider } from '../contexts/llContext'

import PersonList from '../components/PersonList'


const Index = () => {
  const [cards, setCards] = useState([]);
  const [db, setDb] = useState(null);

  useEffect (() => {
    const getCards = async () => {
      const firebase = await loadFirebase();
      const ddb = firebase.firestore()
      setDb(ddb);
      const cardsDB = ddb.collection('people').limit(10);
      cardsDB.onSnapshot(snapshot => {
        const results = [];
        snapshot.forEach(doc => {
          results.push({id:doc.id, ...doc.data()})
        })
        setCards(results)
      })
    };
    getCards();
  },[]);

  return (
    <main>
      <Head>
        <title>Lugar Livre</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://unpkg.com/reset-css/reset.css" />
      </Head>
      <Header />
      <h1>Lugar livre</h1>
      <LLProvider value={{cards, db}}>
        <PersonList/>
      </LLProvider>  
    </main>
  );
}

export default Index