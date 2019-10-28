import React, { useState, useEffect } from 'react'
import 'reset-css'
import Header from '../components/Header';
import { LLProvider } from '../contexts/llContext'
import loadFirebase from '../firebase'

import PersonList from '../components/PersonList'

const List = () => {

  const [cards, setCards] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const getCards = async () => {
      const firebase = await loadFirebase();
      const ddb = firebase.firestore()
      setDb(ddb);
      const cardsDB = ddb.collection('people').limit(10);
      cardsDB.onSnapshot(snapshot => {
        const results = [];
        snapshot.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setCards(results)
      })
    };
    getCards();
  }, []);

  return (
    <div>
      <Header />
      <h1>Escolha uma pessoa</h1>
      <LLProvider value={{ cards, db }}>
        <PersonList />
      </LLProvider>
    </div>
  )
}

export default List;