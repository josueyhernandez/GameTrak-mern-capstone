import React, { useState, useEffect } from "react"
import "./item.css"
import { useProvideStyle } from 'hooks/useStyle';
import { Button, Dropdown, Form } from "react-bootstrap"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ItemsPage() {
    const { state, dispatch } = useProvideUser()
    const [itemName, setItemName] = useState()
    const [itemType, setItemType] = useState()
    const [itemDes, setItemDes] = useState()
    const [items, setItems] = useState()
    const colorScheme = useProvideStyle();
    const [validated, setValidated] = useState(false);

    async function validateToken() {
        if (state) {
            await axios
                .post('/api/auth', {
                    token: state.token
                })
                .then((res) => {
                    setValidated(res.data._id === state.id)
                })
                .catch((err) => {
                    setValidated(false)
                })
        }
        else {
            setValidated(false)
        }
    }
    useEffect(validateToken, [state])

    document.body.setAttribute("id", colorScheme.getStyle())

    function setColor(color) {
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    async function createNewItem() {
        await axios.post("/api/items",
            {
                name: itemName,
                type: itemType,
                description: itemDes,
                game: state.currentGame.id
            })
            .then((res) => {
                showItems()
            })
    }
    async function showItems() {
        if(state.currentGame !== null){
        await axios.get(`/api/items/${state.currentGame.id}`)
            .then((res) => {
                setItems(res.data)
            })
        }
    }
    useEffect(showItems, [state])

    return (
        <main>
             {validated ? <div className="main">
            <div className="log">
                <Button className="logout" onClick={() =>{
                     dispatch({
                        type: 'LOGOUT',
                        info: "TEST",
                    })
                     window.location.replace("/")}}>Logout</Button>
                <Button className="back" onClick={() => window.location.replace("/games")}>Back to List</Button>
                <div id="current-game">
                    {state.currentGame && <div id="game-title">{state.currentGame.name}</div>}
                    {state.currentGame && <img height="50px" src={state.currentGame.image} />}
                </div>
            </div>
            <div className="header">
                <h3><a className="header-item" href="/character">Character</a></h3>
                <h3><a className="header-item" href="/item">Items</a></h3>
                <h3><a className="header-item" href="/places">Places</a></h3>
                <h3><a className="header-item" href="/skills">Skills</a></h3>
                <h3><a className="header-item" href="/attributes">Attributes</a></h3>
            </div>
            <h1 class="item">Items</h1>
            <div id="item-forms">
                <Form.Group class="item-name">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control onChange={(e) => {
                        setItemName(e.target.value)
                    }
                    } type="text" placeholder="Enter Name For Item" />
                    <Form.Text className="text-muted">
                        You can list the items here!
                    </Form.Text>
                    <Form.Label>Type</Form.Label>
                    <Form.Control onChange={(e) => {
                        setItemType(e.target.value)
                    }
                    } type="text" placeholder="Enter Type For Item" />
                    <Form.Text className="text-muted">
                        You name the item-type here!
                    </Form.Text>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => {
                        setItemDes(e.target.value)
                    }
                    } type="text" placeholder="Enter Description For Item" />
                    <Form.Text className="text-muted">
                        You describe the item here!
                    </Form.Text>
                    <Button onClick={createNewItem}>Create New Item</Button>
                </Form.Group>
            </div>
            <h4>List of Items:</h4>
                <div id="items-list">
                    {items !== undefined && items.map(item=>{
                        return(
                            <div className = "displayed-item">
                                <div>Name: {item.name} </div>
                                {item.type && <div>Type: {item.type}</div>}
                                {item.description && <div> {item.description}</div>}
                            </div>
                        )
                    })}

                </div>

            
            <label for="color" id="bottom">Please select a color:</label>
            <select id="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Purple</option>
            </select>
            </div>:
            <div className="main">
            {/* <h3>You are not authorized to use this page yet </h3>
            <button onClick={() => {
                dispatch({
                    type: 'LOGOUT',
                    info: "TEST",
                })
                window.location.replace("/")
            }}>Go Back To Login</button> */}
        </div>
    }
        </main>
    )
}