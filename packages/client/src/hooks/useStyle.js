import { useState } from 'react'


export function useStyle() {
    const [style, setStyle] = useState("green")

    function getStyle() {
        return style
    }

    function setNewStyle(color) {
        setStyle(color)
    }

    return {
        style,
        getStyle,
        setNewStyle,
    }
}