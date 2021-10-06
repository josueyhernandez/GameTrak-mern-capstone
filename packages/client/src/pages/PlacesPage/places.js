import React from "react"
import "./places.css"
import { useProvideStyle } from 'hooks/useStyle';

export default function PlacesPage() {
    const colorScheme = useProvideStyle();

    document.body.setAttribute("id", colorScheme.getStyle())

    function setColor(color){
        console.log(color.target.value)
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    return (
        <main>
            <h1 class="place">Places</h1>
            <select name="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Purple</option>
            </select>
        </main>
    )
}