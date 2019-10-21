import { useState } from 'react'
import { useKeyboard } from '../utility'

function useDrawing() {
  let [editing, setEditing] = useState(false)
  let toggleEditing = () => setEditing(!editing)

  function handleKeyboard (e) {
    if (e.key === 'Insert') {
      toggleEditing()
    }
  }
  useKeyboard(handleKeyboard)

  return [editing, setEditing]
}

export default useDrawing
