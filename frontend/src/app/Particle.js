import { useSpring, animated } from 'react-spring';
import React from 'react'
import styled from 'styled-components'

import { CENTER_COLOR_GREEN, CENTER_COLOR_RED } from './Layout';
import Answers from './Answers';

let SelfCenter = styled.div`
  transform: translate(-50%, -50%);
`
let ParticleTemplate = styled.div`
  position: absolute;
  font-size: 32px;
  white-space: nowrap;
`

let Wrapper = styled.div`
  text-decoration: ${p => p.done ? 'none' : p.hit ? 'none' : 'line-through'};
  color: ${p => p.done ? p.hit ? CENTER_COLOR_GREEN : CENTER_COLOR_RED : '#ddd'};

`

let Tooltip = styled.div`
  & > span {
    display: none;
  }

  &:hover {
    & > span {
      display: block;
    }
  }

  position: relative;
`
let Details = styled.span`
  position: absolute;
  left: 0;
  top: 30px;
  background-color: white;
  z-index: 100;
`


function Particle ({ x, y, children, hit, word, done, answers }) {
  let props = useSpring({
    transform: `translate(${x}px, ${y}px)`,
    from: {
      transform: `translate(${x}px, ${y}px)`,
    }
  })
  let content = !done ? word : <Tooltip>
    {word}
    <Details>
      <Answers answers={answers} />
    </Details>
  </Tooltip>
  return (
    <ParticleTemplate>
      <animated.div style={props}>
        <SelfCenter>
          <Wrapper done={done} hit={hit}>
            {content}
          </Wrapper>
        </SelfCenter>
      </animated.div>
    </ParticleTemplate>
  )
            // <Word input={x.input} word={x.word} finish={true} />
          // </Particle>
}

export default Particle
