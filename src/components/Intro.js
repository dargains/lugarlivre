//import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../components/Button'
import AltButton from '../components/AltButton'
import moment from 'moment';
import 'moment/locale/pt'

const Intro = ({ owners, currentOwner, handleOwnerChange, startDate, endDate, handleStartDateChange, handleEndDateChange, handleNext }) => {
  const [focusedInput, setFocus] = useState(null)
  const [calendarOpened, setCalendarOpen] = useState(false)
  const [value, setValue] = useState(currentOwner.name)
  const [showError, setShowError] = useState(false)
  const today = moment();
  const tomorrow = moment().add(1, 'day');
  const isToday = today.isSame(startDate, 'd') && today.isSame(endDate, 'd')
  const isTomorrow = tomorrow.isSame(startDate, 'd') && tomorrow.isSame(endDate, 'd')

  const handleDateChange = ({ startDate, endDate }) => {
    handleStartDateChange(startDate)
    handleEndDateChange(endDate)
  }
  const setDate = day => {
    if (day === 'today') {
      handleStartDateChange(moment())
      handleEndDateChange(moment())
    } else {
      handleStartDateChange(moment().add(1, 'day'))
      handleEndDateChange(moment().add(1, 'day'))
    }
    goToNext()
  }
  const goToNext = () => {
    if (currentOwner.name) {
      document.querySelector('input').classList.remove('error')
      setShowError(false)
      handleNext()
    } else {
      document.querySelector('input').classList.add('error')
      setShowError(true)
    }
  }

  useEffect(() => {
    if (startDate && endDate && !isToday && !isTomorrow) setCalendarOpen(true)
  }, [])

  return (
    <Container>
      <Title>Lugar Livre</Title>
      <Subtitle>Partilha o teu lugar de estacionamento</Subtitle>
      <ReactAutocomplete
        items={owners}
        inputProps={{
          placeholder: 'Nome',
          onFocus: ({ target }) => { target.classList.remove('error'); setShowError(false) }
        }}
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
          padding: '5px 0',
          position: 'fixed',
          overflow: 'auto',
          zIndex: 10,
          maxHeight: '20%',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      />
      <br /><br />
      {
        calendarOpened
          ? <>
            <DateRangePicker
              startDate={startDate}
              startDateId="startDate"
              endDate={endDate}
              endDateId="endDate"
              numberOfMonths={1}
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
            <Button handleClick={goToNext}>Continuar</Button>
          </>
          : <>
            <AltButton handleClick={() => setDate('today')} isActive={isToday}>hoje</AltButton>
            <AltButton handleClick={() => setDate('tomorrow')} isActive={isTomorrow}>amanhã</AltButton>
            <AltButton handleClick={() => setCalendarOpen(true)}>outros dias</AltButton>
          </>
      }
      <br /><br />

      <Error className={showError ? 'show' : ''}>Falta dizer quem és</Error>

      <div style={{ marginTop: '60px' }}>
        <Body>Não toleramos desculpas</Body>
        <Body><span>Faz-te esperto!</span></Body>
      </div>
    </Container>
  );
}

const Container = styled.article`
  text-align: center;
  input {
    text-align: left;
    padding: 18px 16px;
    border: 1px solid var(--neu-03);
    border-radius: 4px;
    font-size: 1.2em;
    color: var(--neu-05);
    transition: all .2s ease;
    &::placeholder {
      color: var(--neu-04);
    }
    &.error {
      color: var(--m-02);
      border-color: var(--m-02);
    }
  }
`;

const Title = styled.h1`
  font-size: 1em;
  text-transform: uppercase;
`;

const Subtitle = styled.h2`
  margin: 20px 0 80px;
  font-size: 18px;
  font-weight: normal;
`;

const Body = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 2px auto;
  span {
    color: var(--m-01);
    font-weight: bold;
  }
`;

const Error = styled.span`
  opacity: 0;
  color: var(--m-02);
  font-size: 0.8em;
  transition: opacity .2s ease;
  &.show {
    opacity: 1;
  }
`;

export default Intro