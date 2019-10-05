import React from 'react'
import styled from 'styled-components'

let DefaultStyle = styled.div`
  color: #06c;
`
let RightStyle = styled.div`
  color: #0c6;
`
let WrongStyle = styled.div`
  color: #c66;
`

export function JustInput ({ input, rightness }) {
  let Wrapper
  if (rightness === null) Wrapper = DefaultStyle
  if (rightness === true) Wrapper = RightStyle
  if (rightness === false) Wrapper = WrongStyle

  return <Wrapper>{input}</Wrapper>
}
