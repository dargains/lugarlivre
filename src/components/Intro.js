//import React, { useState } from 'react'
import React, { useState } from 'react'
import ReactAutocomplete from 'react-autocomplete';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../components/Button'
import moment from 'moment';
import 'moment/locale/pt'

const Intro = ({ owners, handleOwnerChange, startDate, endDate, handleStartDateChange, handleEndDateChange, handleNext, isActive }) => {
  const [focusedInput, setFocus] = useState(null)
  const [value, setValue] = useState('')
  const handleDateChange = ({ startDate, endDate }) => {
    handleStartDateChange(startDate)
    handleEndDateChange(endDate)
  }
  return (
    <main style={{ opacity: isActive ? 1 : '0.5' }}>
      <h2>home</h2>
      <h3>Quem és?</h3>
      <ReactAutocomplete
        items={owners}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
          >
            {item.name}
          </div>
        }
        value={value}
        onChange={e => setValue(e.target.value)}
        onSelect={value => {
          setValue(value)
          handleOwnerChange(owners.find(owner => owner.name === value))
        }}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          position: 'fixed',
          overflow: 'auto',
          zIndex: 10,
          maxHeight: '20%', // TODO: don't cheat, let it flow to the bottom
        }}
      />
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
      />
      <Button handleClick={handleNext}>continuar</Button>
    </main>
  );
}

export default Intro