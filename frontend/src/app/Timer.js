import { differenceInSeconds, subSeconds } from 'date-fns';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import useInterval from '@use-it/interval'
import styled from 'styled-components'

let CHECK_INTERVAL = 100

// NOTE: disabled the timer this ugly way
let TimerDiv = styled.div`
  display: none;
`

let Timer = ({ durationSec: durationSecGiven, onDone, paused }, ref) => {
  let [started, setStarted] = useState(null)
  let [current, setCurrent] = useState(null)
  let [done, setDone] = useState(false)
  let [pausedAtDifference, setPausedAtDifference] = useState(null)
  let [durationSecOwn, setDurationSecOwn] = useState(null)
  // let [unPaused, setUnPaused] = useState(true)
  let durationSec = durationSecOwn || durationSecGiven

  useEffect(() => {
    let now = new Date()
    if (paused) {
      let timeLeft = durationSec - differenceInSeconds(now, started)
      setPausedAtDifference(timeLeft)
      // setUnPaused(false)
    } else {
      if (pausedAtDifference) {
        setStarted(now)
        setDurationSecOwn(pausedAtDifference)
        // setUnPaused(true)
      }
    }
  }, [paused])

  useInterval(() => {
    if (done) return
    if (paused) return
    // if (!unPaused) return
    if (!started) return

    let now = new Date()
    let difference = differenceInSeconds(now, started)
    if (difference !== current) setCurrent(difference)
    let timeLeft = durationSec - current
    if (timeLeft <= 0) {
      onDone()
      setDone(true)
    }
  }, CHECK_INTERVAL)

  useImperativeHandle(ref, () => ({
    start: () => {
      if (!started) setStarted(new Date())
    },
    finish: () => {
      if (!done) {
        onDone()
        setDone(true)
      }
    }
    // clear: () => to start after done have finished
  }))

  let timeLeft = durationSec - current

  return <TimerDiv>{timeLeft} sec.</TimerDiv>
}
Timer = forwardRef(Timer)

export default Timer
