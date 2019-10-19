import React from 'react'

import Typing from './Typing'
import questions from './data/questions.json'
import { shuffle } from 'lodash'

function App () {
  let xs = questions
  if (process.env.NODE_ENV === 'development') {
    xs = xs.slice(0,3)
  }
  xs = shuffle(xs)
  return <Typing questions={xs} />
}

export default App
