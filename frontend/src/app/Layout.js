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

let Center = styled.div`
  // margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  outline: solid 3px green;
`

let LINE_COLOR = '#123'
let LINE_LENGTH = 85
let TOP = 30
let MIDDLE = 5

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
    height: ${LINE_LENGTH}px;
    width: 1px;
    background-color: ${LINE_COLOR};
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
      <Center>
        {center}
      </Center>
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
