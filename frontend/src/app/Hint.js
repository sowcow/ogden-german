import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import hintsData from './data/hints'

import { useKeyboard } from './utility';

let Root = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  min-width: 50vw;

  font-size: 50%;
  color: gray;
  background-color: white;
`
let Text = styled.div`
  padding: 0 30px;
`

function Hint({ question }) {
  let [index, setIndex] = useState(-1)
  let [side, setSide] = useState('from')

  let nextHint = () => {
    let xs = hintsData[question]
    if (!xs) return

    let nextIndex = index + 1
    if (nextIndex >= xs.length) {
      nextIndex = 0
    }
    setIndex(nextIndex)
  }

  let processEvent = thisSide => {
    if (index < 0) {
      nextHint()
      setSide(thisSide)
      return
    }

    if (side === thisSide) {
      nextHint()
    } else {
      setSide(thisSide)
    }
  }
  function handleKeyboard (e) {
    if (e.key === 'PageUp') {
      processEvent('from')
    } else if (e.key === 'PageDown') {
      processEvent('to')
    }
  }

  useKeyboard(handleKeyboard)

  useEffect(() => {
    setIndex(-1)
  }, [question])

  let hint = ''
  if (index >= 0) {
    let xs = hintsData[question]
    if (xs) {
      let item = xs[index]
      if (item) {
        hint = item[side]
      }
    }
  }

  return <Root>
    <Text>
      { hint }
    </Text>
  </Root>
}

export default Hint
