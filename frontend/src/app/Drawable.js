import { useViewport } from 'react-viewport-hooks'
import CanvasDraw from 'react-canvas-draw'
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import * as drawings from './state/drawings'

import { useKeyboard } from './utility'

const CATENARY_COLOR = '#fff'
const BRUSH_COLOR = '#000'
const BRUSH_RADUS = 3
const LAZY_RADUS = 1

let Template = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`


let onChange = (question, given) => {
  let data = given.getSaveData()
  // data = JSON.stringify(data)
  drawings.save(question, data);
}

const NO_DATA = JSON.stringify({
  lines: [],
  width: 10,
  height: 10,
})

// non-ideal to pass it there but so what
function Drawable({ question }) {
  function handleKeyboard (e) {
    if (e.key === 'Delete') {
      canvasRef.current.undo()
    }
  }
  useKeyboard(handleKeyboard)

  useEffect(() => {
    async function fetchData() {
      let data = await drawings.load(question)
      if (data) {
        // data = JSON.parse(data)
        canvasRef.current && canvasRef.current.loadSaveData(data)
      } else {
        canvasRef.current && canvasRef.current.loadSaveData(NO_DATA)
      }
    }
    fetchData()
  }, [question])

  let canvasRef = useRef()

  const { vw, vh } = useViewport()

  return <Template>
    <CanvasDraw
      ref={canvasRef}
      onChange={x => onChange(question, x)}
      catenaryColor={CATENARY_COLOR}
      brushRadius={BRUSH_RADUS}
      brushColor={BRUSH_COLOR}
      lazyRadius={LAZY_RADUS}
      canvasWidth={vw}
      canvasHeight={vh}
      hideGrid={true}
      immediateLoading={true}
    />
  </Template>
}

export default Drawable
