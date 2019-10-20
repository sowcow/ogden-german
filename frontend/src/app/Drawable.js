import { useViewport } from 'react-viewport-hooks'
import CanvasDraw from 'react-canvas-draw'
import React, { useRef, useEffect, useState } from 'react'
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

let EditingFlag = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  color: red;
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
  let [editing, setEditing] = useState(false)
  let toggleEditing = () => setEditing(!editing)

  function handleKeyboard (e) {
    if (e.key === 'Delete') {
      if (editing) canvasRef.current.undo()
    } else
    if (e.key === 'Insert') {
      toggleEditing()
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
      disabled={!editing}
      catenaryColor={CATENARY_COLOR}
      brushRadius={BRUSH_RADUS}
      brushColor={BRUSH_COLOR}
      lazyRadius={LAZY_RADUS}
      canvasWidth={vw}
      canvasHeight={vh}
      hideGrid={true}
      immediateLoading={true}
      loadTimeOffset={0}
    />
    { editing && <EditingFlag>Drawing mode</EditingFlag> }
  </Template>
}

export default Drawable
