import React from 'react'

import Typing from './Typing'
import questions from './data/questions.json'
import { shuffle } from 'lodash'

function App () {
  let xs = questions // shuffle(questions)
  return <Typing questions={xs} />
}

export default App
