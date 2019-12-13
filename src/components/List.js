import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSprings, animated, to as interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'

// import PersonCard from './PersonCard'
import Container from './Container'
import ButtonContainer from './ButtonContainer'
import AltButton from './AltButton'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(0) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const List = ({ believers, handleBelieverChange, handleNext, handleBack }) => {
  const [showError, setShowError] = useState(false)
  const [gone] = useState(() => new Set())
  const [chosen, setChosen] = useState(null)

  const [props, set] = useSprings(believers.length, i => ({ ...to(i), from: from(i) }))

  var timer = null;

  const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      if (down) {
        timer = setTimeout(() => {
          if (!gone.has(index)) {
            scale = 1.3
            setChosen(i)
            setTimeout(() => {
              choosePerson(believers[i].id)
            }, 800)
          }
        }, 300)
      } else {
        clearTimeout(timer)
        timer = null;
      }
      if (isGone) {
        clearTimeout(timer)
        timer = null;
      }
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      let scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === believers.length) setTimeout(() => gone.clear() || set(i => to(i)), 350)
  })

  const choosePerson = id => {
    setShowError(false)
    handleBelieverChange(id)
    handleNext();
  }
  // const chooseRandom = () => {
  //   const randomId = believers[Math.floor(Math.random() * believers.length)];
  //   choosePerson(randomId.id)
  // }

  const AnimatedPersonCard = animated(PersonCard)

  return (
    <Container style={{ textAlign: 'center' }}>
      <SliderContainer>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.article key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <AnimatedPersonCard
              {...bind(i)}

              style={{
                transform: interpolate([rot, scale], trans),
                color: `var(--m-0${i % 5 + 1})`
              }}
              className={`${chosen === i ? 'opened' : ''}`}
            >
              <span></span>
              <Title>{believers[i].name}</Title>
              <Subtitle>{believers[i].department}</Subtitle>
              <span></span>
            </AnimatedPersonCard>
          </animated.article>
        ))}
      </SliderContainer>

      <Error className={showError ? 'show' : ''}>Falta escolher a pessoa</Error>
      <ButtonContainer>
        {/* <Button handleClick={chooseRandom}>Aleatório</Button> */}
        {/* <Button handleClick={goToNext}>Continuar</Button> */}
        <AltButton handleClick={handleBack} icon="arrow_back" />
      </ButtonContainer>
    </Container >
  )
}

const SliderContainer = styled.div`
height: 60vh;
  article {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PersonCard = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 60px 48px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 45vh;
  max-width: 300px;
  height: 100%;
  max-height: 570px;
  will-change: transform;
  border-radius: 10px;
  background-color: currentColor;
  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: currentColor;
    transition: transform .3s ease-in-out 0.8s;
    transform: scale(1);
    pointer-events: none;
  }
  &.opened {
    &:before {
    transform: scale(3);
    }
    span:nth-of-type(1) {
      animation: closeTopRightBracket .4s cubic-bezier(1, 0, 0, 1) .2s forwards;
    }
    span:nth-of-type(2){
      animation: closeBottomLeftBracket .4s cubic-bezier(1, 0, 0, 1) .2s forwards;
    }
    h2,h3 {
      animation: fadeOut .2s ease-in .2s forwards;
    }
  }
  span:nth-of-type(1),
  span:nth-of-type(2) {
    position: absolute;
    width: 24px;
    height: 48px;
    top: 50%;
    left: 50%;
    pointer-events: none;
    &:before,
    &:after {
      content: '';
      background-color: var(--neu-01);
      position: absolute;
    }
    &:before {
      width: 8px;
      height: 100%;
    }
    &:after {
      width: 100%;
      height: 8px;
    }
  }
  span:nth-of-type(1) {
    transform: translate3d(350%,-250%,0);
    &:before,
    &:after {
      top: 0;
      right: 0;
    }
  }
  span:nth-of-type(2) {
    transform: translate3d(-450%,150%,0);
    &:before,
    &:after {
      bottom: 0;
      left: 0;
    }
  }
`;
const Title = styled.h2`
  color: var(--neu-01);
  font-size: 38px;
  line-height: 44px;
  font-weight: 300;
  letter-spacing: -1.27px;
  margin-bottom: 8px;
  pointer-events: none;
`;
const Subtitle = styled.h3`
  color: var(--neu-01);
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  pointer-events: none;
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



export default List;