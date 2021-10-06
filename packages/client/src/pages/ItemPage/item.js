import React from "react"
import "./item.css"
import { useProvideStyle } from 'hooks/useStyle';

export default function ItemPage() {
    const colorScheme = useProvideStyle();

    document.body.setAttribute("id", colorScheme.getStyle())
    //function goes here

    function setColor(color){
        console.log(color.target.value)
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    return (
        <main>
            <h1 class="item">Item</h1>
            <select name="color" onChange={setColor}>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
            </select>
        </main>
    )
}