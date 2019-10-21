import React, { useState, useContext, createContext } from 'react'

let Get = createContext(null)
let Set = createContext(() => {})

export function useGetFinished() {
  return useContext(Get)
}
export function useSetFinished() {
  return useContext(Set)
}

export function ProvideFinished({ children }) {
  let [state, setState] = useState(null)

  return <Get.Provider value={state}>
    <Set.Provider value={setState}>
      { children }
    </Set.Provider>
  </Get.Provider>
}
