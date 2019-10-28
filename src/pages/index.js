import React, { useState } from 'react'
import 'reset-css'
import Head from 'next/head'

import Header from '../components/Header';

const Index = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <main>
      <Head>
        <title>Lugar Livre</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <h1>Lugar livre</h1>
      <form>

      </form>
    </main>
  );
}

export default Index