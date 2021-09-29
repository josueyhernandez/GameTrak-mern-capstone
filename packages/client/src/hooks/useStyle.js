import { useState, useContext, createContext, useEffect } from 'react'

const initialState = {
    color: "green"
}

export const StyleContext = createContext()

StyleContext.displayName = "StyleContext"


export function ProvideStyle({ children }) {
    const [style] = initialState
    return (
        <StyleContext.Provider value ={{style}}>{children}</StyleContext.Provider>
    )
}

export const useStyle = () => {
    return useContext(StyleContext)
}

export function useProvideStyle() {
    let style = useStyle()
    
    function getStyle() {
        return localStorage.getItem("style")
    }

    function setNewStyle(color) {
        localStorage.setItem("style", color)
    }

    return {
        style,
        getStyle,
        setNewStyle,
    }
}