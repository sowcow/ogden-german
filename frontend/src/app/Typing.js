import { animated, useSpring } from 'react-spring'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { distance, ending, useKeyboard } from './utility'
import Layout from './Layout'
import Particle from './Particle'
import Timer from './Timer'
import Word, { JustInput } from './Word';

import { sample, escapeRegExp } from 'lodash'

let DURATION = 60

let INFO = [
  'Type a translation with enter when you are ready',
  'Umlauts can be produced by typing a: or a"',
  'ß can be replaced with just "ss"',
  'The timer starts after any input',
  'If you need to restart — reload the page;'
]

let A_LETTER = /^.$/

let AnswerList = styled.ul`
  list-style: none;
  font-size: 50%;
  color: #888;
`

function matches(word, answers) {
  let re = new RegExp(`\b${escapeRegExp(word)}\b`)

  let answer = answers.find(x => {
    let expectedWord = x.word
    let withNoSS = expectedWord.replace(/ß/g, 'ss')

    let versions = [
      expectedWord,
      withNoSS,
    ]

    let addMore = f => {
      let got = versions.map(f)
      versions.push(...got)
    }

    if (x.gender === 'm') addMore(x => `der ${x}`)
    if (x.gender === 'f') addMore(x => `die ${x}`)
    if (x.gender === 'n') addMore(x => `das ${x}`)

    return versions.find(x => x === word || x.match(re))
  })
  return !!answer
}

function Typing ({ questions }) {
  let [started, setStarted] = useState(false)
  let [done, setDone] = useState(false)
  let [good, setGood] = useState(0)
  let [bad, setBad] = useState(0)

  let [input, setInput] = useState('')
  let [particles, setParticles] = useState([])
  let [wordIndex, setWordIndex] = useState(0)
  let question = questions[wordIndex]

  let [isChecking, setChecking] = useState(false)
  let [isHit, setHit] = useState(false)

  let nextWord = () => {
    let { dx, dy } = distance()
    let particle = { input, word: question.question, dx, dy }

    setParticles(particles.concat(particle))
    setWordIndex(wordIndex + 1)
    setInput('')
  }

  let startGame = () => {
    timerRef.current.start()
    setStarted(true)
  }

  function handleKeyboard (e) {
    if (done) return
    if (e.ctrlKey) return // reloading ctrl+r

    let ignore = isChecking

    if (e.key === 'Enter') {
      startGame()
      // if (input === '') return // NOTE: double presses are ok.....
      if (isChecking) {
        setChecking(false)
        nextWord()
      } else {
        input = input.trim()
        if (!input) {
          input = noInput()
          setInput(input)
        }

        let hit = matches(input, question.answers)

        if (hit) {
          setGood(good + 1)
        } else {
          setBad(bad + 1)
        }

        setHit(hit)
        setChecking(true)
      }
    } else if (e.key === 'Backspace') {
      if (ignore) return
      setInput(input.substring(0, input.length - 1))
    } else if (A_LETTER.test(e.key)) {
      if (ignore) return
      startGame()
      input += e.key
      setInput(applyUmlauts(input))
    }
  }

  useKeyboard(handleKeyboard)

  let timerRef = useRef()

  let onTimer = () => {
    setDone(true)
  }

  let targetColor = done ? '#06c' : 'gray'
  let props = useSpring({
    color: targetColor,
    padding: done ? 30 : 0,
    from: {
      color: 'gray',
      padding: 0
    }
  })
  let hideOnDone = useSpring({ opacity: done ? 0 : 1, from: { opacity: 1 } })

  let rotateOnDone = useSpring({
    config: {
      friction: 1,
      clamp: 1
    },
    from: {
      opacity: 1,
      transform: 'rotate(0deg) scale(1)'
    },
    to: !done
      ? []
      : [
          {
            opacity: 1,
            transform: 'rotate(360deg) scale(1.1)'
          },
          {
            opacity: 0,
            transform: 'rotate(0deg) scale(0)'
          }
        ]
  })

      // left={
      //   <Particle dx={0} dy={0} focus={true}>
      //     <animated.div style={rotateOnDone}>
      //       <Word input={input} word={word} focus={true} hideCursor={done} />
      //     </animated.div>
      //   </Particle>
      // }
      // right={
      //   <Particle dx={0} dy={0} focus={true}>
      //     <animated.div style={rotateOnDone}>
      //       <Word input={input} word={word} focus={true} hideCursor={done} />
      //     </animated.div>
      //   </Particle>
      // }
  let rightness = isChecking ? isHit : null
  return (
    <Layout
      rightness={rightness}
      info={started ? null : INFO}
      center={
        particles.map((x, i) => (
          <Particle dx={x.dx} dy={x.dy} key={i}>
            <Word input={x.input} word={x.word} finish={true} />
          </Particle>
        ))
      }
      left={question.question}
      right={<>
        <JustInput input={input} rightness={rightness} />
        { !isChecking ? null :
          <div>
            <AnswerList>
              {
                question.answers.map((x, i) =>
                  <li key={i}>{ withGender(x) }</li>
                )
              }
            </AnswerList>
          </div>
        }
      </>}
      stats={
        <animated.div style={props}>
          <animated.div style={hideOnDone}>
            <Timer ref={timerRef} durationSec={DURATION} onDone={onTimer} />
          </animated.div>
          <div>
            {good} hit{ending(good, 's')}
          </div>
          <div>
            {bad} miss{ending(bad, 'es')}
          </div>
        </animated.div>
      }
    />
  )
}

let MStyle = styled.div`
  // color: #66f;
`
let FStyle = styled.div`
  // color: #f66;
`
let NStyle = styled.div`
  // color: #666;
`
let NoStyle = styled.div``

function withGender(x) {
  let m = x.gender === 'm'
  let f = x.gender === 'f'
  let n = x.gender === 'n'

  let prefix = ''
  if (m) prefix = 'der '
  if (f) prefix = 'die '
  if (n) prefix = 'das '

  let Wrapper = NoStyle
  if (m) Wrapper = MStyle
  if (f) Wrapper = FStyle
  if (n) Wrapper = NStyle

  return <Wrapper>{`${prefix}${x.word}`}</Wrapper>
}

function applyUmlauts(text) {
  if (text.length < 2) return text
  let last = text[text.length - 1]
  let beforeLast = text[text.length - 2]

  if (last !== ':' && last !== '"') return text

  let use = letter =>
    text.slice(0, text.length - 2) + letter

  if (beforeLast === 'A') return use('Ä')
  if (beforeLast === 'a') return use('ä')
  if (beforeLast === 'O') return use('Ö')
  if (beforeLast === 'o') return use('ö')
  if (beforeLast === 'U') return use('Ü')
  if (beforeLast === 'u') return use('ü')

  return text
}

let NO_INPUT = [
  '???',
]
function noInput() {
  return sample(NO_INPUT)
}

export default Typing
