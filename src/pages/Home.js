//import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import Search from 'react-search';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../components/Button'
import moment from 'moment';
import 'moment/locale/pt'

const Home = ({ owners, handleOwnerChange, startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
  const [focusedInput, setFocus] = useState(null)
  const handleDateChange = ({ startDate, endDate }) => {
    console.log(startDate);
    handleStartDateChange(startDate)
    handleEndDateChange(endDate)
  }
  const selectOwner = (items) => {
    handleOwnerChange(items[0])
  }
  const handleKey = (e) => {
    console.log(e)
  }
  return (
    <>
      <h2>home</h2>
      <h3>Quem és?</h3>
      <Search items={owners}
        placeholder='O teu nome'
        maxSelected={1}
        NotFoundPlaceholder="Nenhum nome correspondente"
        onKeyChange={handleKey}
        onItemsChanged={selectOwner} />
      <p>datas</p>
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        numberOfMonths={2}
        minimumNights={0}
        small={true}
        minDate={moment()}
        maxDate={moment().add(10, 'days')}
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={input => setFocus(input)}
        startDatePlaceholderText="Data início"
        endDatePlaceholderText="Data fim"
        phrases={{
          November: "janeiro"
        }}
      />
      <Button to='/list'>continuar</Button>
    </>
  );
}

export default Home