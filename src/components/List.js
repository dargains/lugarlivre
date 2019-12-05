import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSprings, animated, to as interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'

// import PersonCard from './PersonCard'
import ButtonContainer from './ButtonContainer'
import AltButton from './AltButton'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(3000px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const List = ({ believers, chosenBeliever, handleBelieverChange, handleNext, handleBack }) => {
  const [showError, setShowError] = useState(false)
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(believers.length, i => ({ ...to(i), from: from(i) }))

  const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      let scale = down ? 1.1 : 1 // Active cards lift up a bit
      if (!down && !trigger) {
        scale = 1.3
        setTimeout(() => {
          choosePerson(believers[i].id)
        }, 1000)
      }
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === believers.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
  })

  // const isChosen = id => chosenBeliever?.id === id
  const choosePerson = id => {
    setShowError(false)
    handleBelieverChange(id)
    handleNext();
  }
  const chooseRandom = () => {
    const randomId = believers[Math.floor(Math.random() * believers.length)];
    choosePerson(randomId.id)
  }

  const AnimatedPersonCard = animated(PersonCard)

  return (
    <Container>
      <SliderContainer>
        {/* {believers.map(card => <PersonCard key={card.id} {...card} handleBelieverChange={choosePerson} isChosen={isChosen(card.id)} />)} */}
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.article key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <AnimatedPersonCard
              {...bind(i)}

              style={{
                transform: interpolate([rot, scale], trans),
                backgroundColor: `var(--m-0${i + 1})`
              }}
            >
              <Title>{believers[i].name}</Title>
              <Subtitle>{believers[i].department}</Subtitle>
            </AnimatedPersonCard>
          </animated.article>
        ))}
      </SliderContainer>

      <Error className={showError ? 'show' : ''}>Falta escolher a pessoa</Error>
      <ButtonContainer>
        {/* <Button handleClick={chooseRandom}>Aleatório</Button> */}
        {/* <Button handleClick={goToNext}>Continuar</Button> */}
        <AltButton handleClick={handleBack}>Voltar</AltButton>
      </ButtonContainer>
    </Container >
  )
}

const Container = styled.article`
  text-align: center;
`;

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
  padding: 60px 16px;
  border-radius: 7px;
  text-align: left;
  /* background-color: lightblue; */
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 45vh;
  max-width: 300px;
  height: 50vh;
  max-height: 570px;
  will-change: transform;
  border-radius: 10px;
`;
const Title = styled.h2`
  color: var(--neu-01);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.67px;
  line-height: 27px;
  margin-bottom: 24px;
`;
const Subtitle = styled.h3`
  color: var(--neu-01);
  font-size: 16px;
  line-height: 22px;
  font-weight: normal;
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