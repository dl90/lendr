import React, { createContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'

export const AppContext = createContext(initialState)
export default function AppProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
