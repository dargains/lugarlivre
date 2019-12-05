//import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/pt'

import Title from '../components/Title'
import ButtonContainer from '../components/ButtonContainer'
import Button from '../components/Button'
import AltButton from '../components/AltButton'

import logo from '../images/Logo.svg'

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
      <LogoComp>
        <img src={logo} alt="Lugar Livre" />
      </LogoComp>
      <Title>Lugar Livre</Title>
      <Subtitle>Partilha o teu lugar de estacionamento</Subtitle>
      <div className="autocomplete">
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
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '5px 20px', color: 'var(--neu-06)' }}
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
            background: 'rgba(255, 255, 255, 1)',
            padding: '5px 0',
            position: 'fixed',
            overflow: 'auto',
            zIndex: 10,
            maxHeight: '20%',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        />
        <span className="border_tr" />
        <span className="border_bl" />
      </div>

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
          : <ButtonContainer>
            <Button primary handleClick={() => setDate('today')} isActive={isToday}>hoje</Button>
            <Button handleClick={() => setDate('tomorrow')} isActive={isTomorrow}>amanhã</Button>
            <AltButton handleClick={() => setCalendarOpen(true)}>outros dias</AltButton>
          </ButtonContainer>
      }
      <Error className={showError ? 'show' : ''}>Falta dizer quem és</Error>
    </Container>
  );
}

const Container = styled.article`
  text-align: center;
  input {
    text-align: left;
    padding: 18px 0;
    font-size: 1.2em;
    color: var(--neu-06);
    transition: all .2s ease;
    border: 0;
    &::placeholder {
      color: var(--neu-04);
    }
    &.error {
      color: var(--m-02);
      border-color: var(--m-02);
    }
  }
  .autocomplete {
    width: 260px;
    margin: 60px auto;
  }
  .border_tr,
  .border_bl {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    pointer-events: none;
    &:before,&:after {
      content: '';
      background-color: var(--neu-03);
      position: absolute;
    }
  }
  .border_tr:before,
  .border_bl:before {
    height: 3px;
    width: 95%;
  }
  .border_tr:after,
  .border_bl:after {
    width: 3px;
    height: 95%;
  }
  .border_tr:before {
    top: 0;
    right: 0;
  }
  .border_tr:after {
    top: 0;
    right: 0;
  }
  .border_bl:before {
    bottom: 0;
    left: 0;
  }
  .border_bl:after {
    bottom: 0;
    left: 0;
  }
`;

const Subtitle = styled.h2`
  margin: 20px 0 80px;
  font-size: 18px;
  font-weight: normal;
  color: var(--neu-06);
  max-width: 260px;
  margin: 20px auto;
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

const LogoComp = styled.figure`
  max-width: 40px;
  margin: 0 auto 12px;
`;

export default Intro