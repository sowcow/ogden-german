import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

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

let CENTER_COLOR = '#06c'
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
    left: 50%;
    transform: translateY(${CENTER_DELTA}px) translateX(-50%);
    height: ${CENTER_SIZE}px;
    width: ${CENTER_SIZE}px;
    border-radius: 50%;
    background-color: ${CENTER_COLOR};
  }
  > div:nth-child(3) {
    left: calc(50% + ${MIDDLE}px);
  }
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
function Layout ({ info, center, stats, left, right }) {
  return (
    <Root>
      <Global />
      <CenterBox>
        <Center>
          {center}
        </Center>
      </CenterBox>
      <MyThreeColumns>
        <div>
          {left}
        </div>
        <div />
        <div>
          {right}
        </div>
      </MyThreeColumns>
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
