import React from 'react';
import styled from 'styled-components'

let AnswerListTemplate = styled.ul`
  list-style: none;
  font-size: 50%;
  color: #888;
`

let Answers = ({ answers }) =>
  <AnswerListTemplate>
    {
      answers.map((x, i) =>
        <li key={i}>{ withGender(x) }</li>
      )
    }
  </AnswerListTemplate>

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

export default Answers
