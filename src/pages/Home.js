//import React, { useState } from 'react'
import React, { useState } from 'react'
import Search from 'react-search';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../components/Button'
import moment from 'moment';

const Home = ({ owners, handleOwnerChange, startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
  const [focusedInput, setFocus] = useState(startDate)
  const handleDateChange = ({ startDate, endDate }) => {
    console.log(startDate, endDate);
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
      {/* https://github.com/airbnb/react-dates */}
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
        maxDate={moment().add('days', 10)}
        onDatesChange={handleDateChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocus} // PropTypes.func.isRequired,
        startDatePlaceholderText="Data início"
        endDatePlaceholderText="Data fim"
        phrases={{
          november: "janeiro"
        }}
      />
      <Button to='/list'>continuar</Button>
    </>
  );
}

export default Home