import React from 'react'
import styled from 'styled-components'

let AnswerListTemplate = styled.ul`
  list-style: none;
  font-size: 50%;
  color: #888;
  max-height: 50vh;
  overflow-y: auto;
`

let NormalItem = styled.li`
`

let LessUsedItem = styled.li`
  opacity: 0.5;
  font-size: 50%;
`

let Answers = ({ answers }) => (
  <AnswerListTemplate>
    {answers.map((x, i) => {
      let item = null
      let text = withGender(x)
      if (x.l) {
        item = <LessUsedItem key={i}>{text}</LessUsedItem>
      } else {
        item = <NormalItem key={i}>{text}</NormalItem>
      }
      return item
    })}
  </AnswerListTemplate>
)

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

function withGender (x) {
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

export default Answers
