import { shuffle } from 'lodash'
import React from 'react'

import { ProvideFinished } from './hooks/useFinished';
import Typing from './Typing'
import getSession from './getSession';
import questions from './data/questions.json'

function App () {
  let xs = questions
  if (process.env.NODE_ENV === 'development') {
    xs = xs.slice(0,3)
  }
  xs = shuffle(xs)
  getSession(xs).takeNextCard() // just starts everything
  return (
    <ProvideFinished>
      <Typing questions={xs} />
    </ProvideFinished>
  )
}

export default App
