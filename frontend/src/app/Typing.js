import { animated, useSpring } from 'react-spring'
import { sample, escapeRegExp, times } from 'lodash'
import React, { useState, useRef } from 'react'

import { JustInput } from './Word'
import { animateParticles, distance, ending, useKeyboard } from './utility'
import { useSetFinished } from './hooks/useFinished';
import Answers from './Answers'
import Drawable from './Drawable';
import Hint from './Hint';
import Layout from './Layout'
import Particle from './Particle'
import Timer from './Timer'
import getSession from './getSession';
import useDrawing from './hooks/useDrawing';

let DURATION = 60

let INFO = [
  'This info will disappear when you start typing',
  'Type a translation when you are ready',
  'Press enter to check the answer and also to get the next word',
  'Press esc to see results of the session',
  'If you want to start new session — reload the page',
  '---',
  '«ä» can be produced by typing «a:» or «a"»',
  '«ß» can be replaced with just «ss»',
  'Omit «der/die/das» if you feel like',
  '---',
  'Press «insert» to enter/exit drawing mode',
  'Press «delete» to delete the last line',
  'The drawing will be associated with the current word',
  '---',
  '«PageUp/PageDown» is how you look into example sentences',
  'Repeaded «PageUp» or «PageDown» gets you the next example',
  'Alternating «PageUp» and «PageDown» shows you translations of the current example',
]

let A_LETTER = /^.$/

function matches (word, answers) {
  let re = new RegExp(`\b${escapeRegExp(word)}\b`)

  let answer = answers.find(x => {
    let expectedWord = x.word
    let withNoSS = expectedWord.replace(/ß/g, 'ss')

    let versions = [expectedWord, withNoSS]

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

function Typing () {
  let [started, setStarted] = useState(false)
  let [done, setDone] = useState(false)
  let [good, setGood] = useState(0)
  let [bad, setBad] = useState(0)

  let timerRef = useRef()
  function completeSession() {
    timerRef.current && timerRef.current.finish()
  }

  let [input, setInput] = useState('')
  let [particles, setParticles] = useState([])
  // let [wordIndex, setWordIndex] = useState(0)
  let [card, setCard] = useState(null)
  card = getSession().lastCard
  if (!card) {
    if (getSession().lastCard) {
      setCard(getSession().lastCard)
    } else {
      if (!done) completeSession()
    }
  }
  let question = card ? card : { question: '', answers: [] }

  let [isChecking, setChecking] = useState(false)
  let [isHit, setHit] = useState(false)

  let nextWord = () => {
    setCard(getSession().takeNextCard())
    setInput('')
  }

  let addParticles = isHit => {
    let moreParticles = []
    times(1, () => {
      let { dx, dy } = distance()
      let particle = {
        input,
        word: question.question,
        answers: question.answers,
        x: dx,
        y: dy,
        hit: isHit
      }

      moreParticles.push(particle)
    })

    setParticles(particles.concat(moreParticles))
  }

  let startGame = () => {
    // timerRef.current.start()
    setStarted(true)
  }

  function handleKeyboard (e) {
    if (done) return
    if (e.ctrlKey) return // reloading ctrl+r

    let ignore = isChecking

    if (e.key === 'Escape') {
      completeSession()
    } else if (e.key === 'Enter') {
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
          getSession().recordHit()
        } else {
          setBad(bad + 1)
          getSession().recordMiss()
        }

        setHit(hit)
        addParticles(hit)
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

  let setFinished = useSetFinished()

  let onTimer = () => {
    setFinished(true)
    setDone(true)
    let animation = animateParticles(particles, setParticles)
    animation()
  }

  // eslint-disable-next-line
  let [drawing, _setDrawing] = useDrawing()

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

  let rightness = isChecking ? isHit : null
  return (
    <>
      <Drawable
        question={question.question}
        drawing={drawing}
      />
    <Layout
      done={done}
      rightness={rightness}
      info={started ? null : INFO}
      center={
        <>
          <Hint question={question.question} />
          {
            particles.map((x, i) => (
              <Particle
                answers={x.answers}
                x={x.x}
                y={x.y}
                hit={x.hit}
                word={x.word}
                key={i}
                done={done}
              />
            ))
          }
        </>
      }
      left={question.question}
      right={
        <>
          <JustInput input={input} rightness={rightness} />
          {!isChecking ? null : (
            <div>
              <Answers answers={question.answers} />
            </div>
          )}
        </>
      }
      stats={
        <animated.div style={props}>
          <animated.div style={hideOnDone}>
            <Timer
              ref={timerRef}
              durationSec={DURATION}
              onDone={onTimer}
              paused={drawing}
            />
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
  </>
  )
}

function applyUmlauts (text) {
  if (text.length < 2) return text
  let last = text[text.length - 1]
  let beforeLast = text[text.length - 2]

  if (last !== ':' && last !== '"') return text

  let use = letter => text.slice(0, text.length - 2) + letter

  if (beforeLast === 'A') return use('Ä')
  if (beforeLast === 'a') return use('ä')
  if (beforeLast === 'O') return use('Ö')
  if (beforeLast === 'o') return use('ö')
  if (beforeLast === 'U') return use('Ü')
  if (beforeLast === 'u') return use('ü')

  return text
}

let NO_INPUT = ['???']
function noInput () {
  return sample(NO_INPUT)
}

export default Typing
