import { useSpring, animated } from 'react-spring';
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';

let Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root, #root > div {
    height: 100%;
  }
  .show, .hide {
    transition: opacity 0.3s;
  }
  .show {
    opacity: 1;
  }
  .hide {
    opacity: 0;
  }
`

let Root = styled.div`
  font-size: 48pt;
  display: flex;
  overflow: hidden;
`

let InfoBox = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  color: gray;
  font-size: 32px;
`

let StatsBox = styled.div`
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;
  color: gray;
  font-size: 32px;
`

let CenterBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

let Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`

let CENTER_COLOR_DEFAULT = '#06c'
export let CENTER_COLOR_GREEN = '#0c6'
export let CENTER_COLOR_RED = '#c66'

let CENTER_DELTA = 38
let CENTER_SIZE = 10
let TOP = 30
let MIDDLE = 20

let MyThreeColumns = styled.div`
  width: 100%;
  display: flex;
  > div {
    top: ${TOP}%;
    position: absolute;
  }
  > div:nth-child(1) {
    right: calc(50% + ${MIDDLE}px);
  }
  > div:nth-child(2) {
    // Circle below
  }
  > div:nth-child(3) {
    left: calc(50% + ${MIDDLE}px);
  }
`

let Circle = styled.div`
  left: 50%;
  transform: translateY(${CENTER_DELTA}px) translateX(-50%);
  height: ${CENTER_SIZE}px;
  width: ${CENTER_SIZE}px;
  border-radius: 50%;
  background-color: ${p =>
    p.rightness === null ? CENTER_COLOR_DEFAULT : (
      p.rightness === true ? CENTER_COLOR_GREEN : CENTER_COLOR_RED
    )
  };
`

// let AtRight = styled.div`
//   position: absolute;
//   top: 50%;
//   right: 0;
//   outline: solid 3px orange;
// `

// let AtLeft = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 0;
//   outline: solid 3px blue;
// `

// info - either null or string[]
// center - element
// stats - element
function Layout ({ rightness, info, center, stats, left, right, done }) {

  let rotateOnDone = useSpring({
    config: {
      friction: 1,
      clamp: 1
    },
    from: {
      width: '100%',
      opacity: 1,
      transform: 'rotate(0deg) scale(1)',
      transformOrigin: 'center',
    },
    to: !done
      ? []
      : [
          {
            opacity: 0.5,
            transform: 'rotate(360deg) scale(0.5)'
          },
          {
            opacity: 0,
            transform: 'rotate(0deg) scale(0)'
          }
        ]
  })

  return (
    <Root>
      <Global />
      <CenterBox>
        <Center>
          {center}
        </Center>
      </CenterBox>
      <animated.div style={rotateOnDone}>
        <MyThreeColumns>
          <div>
            {left}
          </div>
          <Circle rightness={rightness} />
          <div>
            {right}
          </div>
        </MyThreeColumns>
      </animated.div>
      {!info ? null : (
        <InfoBox>
          <ul>
            {info.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </InfoBox>
      )}
      <StatsBox>{stats}</StatsBox>
    </Root>
  )
}

export default Layout
