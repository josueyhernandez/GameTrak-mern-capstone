import React, { useEffect, useState } from "react"
import { Button, Dropdown, Form } from "react-bootstrap"
import "./attribute.css"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useProvideStyle } from 'hooks/useStyle';



export default function AttributePage() {
    const { state, dispatch } = useProvideUser()
    const [attrName, setAttrName] = useState("")
    const [attrType, setAttrType] = useState("")
    const [attrAList, setAttrAList] = useState()
    const [attrBList, setAttrBList] = useState()
    const [chars, setChars] = useState()

    const colorScheme = useProvideStyle();

    document.body.setAttribute("id", colorScheme.getStyle())

    function setColor(color){
        console.log(color.target.value)
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    async function findAttrA() {
        if (state.currentGame) {
            console.log(state.currentGame.id)
            await axios
                .get(`/api/attr/attra/${state.currentGame.id}`)
                .then((res) => {
                    console.log(res.data)
                    setAttrAList(res.data)
                })
        }
    }
    useEffect(findAttrA, [state])
    async function findAttrB() {
        if (state.currentGame) {
            console.log(state.currentGame.id)
            await axios
                .get(`/api/attr/attrB/${state.currentGame.id}`)
                .then((res) => {
                    console.log(res.data)
                    setAttrBList(res.data)
                })
        }
    }
    useEffect(findAttrB, [state])
    async function submitAttr() {
        let charArray
        let attrId
        console.log(state.currentGame.id)
        if (attrType === "") {
            toast.error("Select An Attribute Type")
        } else if (attrName === "") {
            toast.error("Name Your New Attribute")
        } else {
            await axios
            .post('/api/attr', {
                name: attrName,
                type: attrType,
                game: state.currentGame.id,
                owned: false
            })
            await axios
                .get(`/api/chars/${state.currentGame.id}`)
                .then(async res => {
                    charArray = res.data
                    for (let i = 0; i < charArray.length; i++) {
                        let character = charArray[i]
                        await axios
                            .post('/api/attr', {
                                name: attrName,
                                type: attrType,
                                game: state.currentGame.id,
                                owned: true
                            })
                            .then(async res => {
                                attrId = res.data._id
                                await axios
                                    .put('/api/attr/to-characters', {
                                        game: state.currentGame.id,
                                        character: character._id,
                                        attribute: attrId
                                    })
                                    .then(res => {
                                        console.log(res.data)
                                    })
                            })

                    }

                })
            window.location.reload();
        }

    }
    return (
        <main>
            {/* <button onClick={testButton}>Test Button</button> */}
            <div className="log">
                <Button className="logout" onClick={() => window.location.replace("/")}>Logout</Button>
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

            <div id="attribute-forms">
                <h1 class="attribute">Attributes</h1>
                <Form.Group class="attribute-name">
                    <Form.Label>Attribute Name</Form.Label>
                    <Form.Control onChange={(e) => {
                        setAttrName(e.target.value)
                    }
                    } type="text" placeholder="Enter Name For Attribute" />
                    <Form.Text className="text-muted">
                        You can use this for your characters!
                    </Form.Text>
                </Form.Group>
                <br />
                <div id="attribute-creation">
                    <Dropdown id="attribute-type" >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {'Attribute Type ▼ '}
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="attribute-drop" onClick={(e) => {
                            setAttrType(e.target.text)
                        }}>
                            <Dropdown.Item className="attributes">Words</Dropdown.Item>
                            <Dropdown.Item className="attributes">Numbers</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <br />
                <br />
                <div id="attr-info">
                    <div className="rendering-selected">
                        <div><b>Attribute Name:</b> {attrName}</div>
                        <div><b>Attribute Type:</b> {attrType}</div>
                    </div>
                    <div>
                        <b>Letters Attributes</b>
                        {attrAList !== undefined && attrAList.map(attribute => {
                            if(!attribute.owned){
                            return (
                                <div key={attribute._id}>{attribute.name}</div>
                            )
                            }
                        })}
                    </div>
                    <div>
                        <b>Numbers Attributes</b>
                        {attrBList !== undefined && attrBList.map(attribute => {
                            if(!attribute.owned){
                                return (
                                    <div key={attribute._id}>{attribute.name}</div>
                                )
                                }
                        })}
                    </div>
                </div>
            </div>
            <Button onClick={submitAttr}>Make the attribute!</Button>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            <select name="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Yellow</option>
            </select>
        </main>
    )
}