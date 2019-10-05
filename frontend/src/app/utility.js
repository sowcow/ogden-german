import { forceCenter, forceCollide, forceLink, forceSimulation } from 'd3-force'
import { random, times } from 'lodash'
import React, { useEffect } from 'react'

export function ending (number, ending) {
  let hide = number === 1 ? 'hide' : 'show'
  return <span className={hide}>{ending}</span>
}

export function distance () {
  let angle = random(0, Math.PI * 2, true)
  let distance = random(400, 500)
  let dx = distance * Math.cos(angle)
  let dy = distance * Math.sin(angle)
  return { dx, dy }
}

export function useKeyboard (handleKeyboard) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  })
}

export function animateParticles (xs, setter) {
  let links = []
  let index = 0
  times(xs.length, x => {
    times(xs.length, y => {
      links.push({ source: x, target: y, index })
      index += 1
    })
  })
  let simulation = forceSimulation(xs)
    .force('links', forceLink(links))
    .force('collide', forceCollide(100))
    .force('center', forceCenter())

  return () => {
    simulation.tick(100)
    xs = [...xs]
    setter(xs)
  }
}
