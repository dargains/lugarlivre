import React from 'react'

const LLContext = React.createContext({cards:[], db:null})

export const LLProvider = LLContext.Provider
export const LLConsumer = LLContext.Consumer
export default LLContext