import React, { useState, useEffect } from "react"
import "./places.css"
import { useProvideStyle } from 'hooks/useStyle';
import { Button, Dropdown, Form } from "react-bootstrap"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function PlacesPage() {
    const { state, dispatch } = useProvideUser()
    const [placeName, setPlaceName] = useState()
    const [placeType, setPlaceType] = useState()
    const [placeDes, setPlaceDes] = useState()
    const [places, setPlaces] = useState()
    const colorScheme = useProvideStyle();
    const [validated, setValidated] = useState(true);
    async function validateToken() {
		if (state) {
			await axios
				.post('/api/auth', {
					token: state.token
				})
				.then((res) => {
					setValidated(res.data._id === state.id)
				})
                .catch((err)=>{
                    setValidated(false)
                })
		}
	}
	useEffect(validateToken,[state])
    

    document.body.setAttribute("id", colorScheme.getStyle())

    function setColor(color) {
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    async function createNewPlace() {
        await axios.post("/api/places",
            {
                name: placeName,
                type: placeType,
                description: placeDes,
                game: state.currentGame.id
            })
            .then((res) => {
                showPlaces()
            })
    }
    async function showPlaces() {
        if (state.currentGame !== null) {
            await axios.get(`/api/places/${state.currentGame.id}`)
                .then((res) => {
                    setPlaces(res.data)
                })
        }
    }
    useEffect(showPlaces, [state])

    return (
        <main>
            {validated && <div className = "main">
            <div className="log">
                <Button className="logout" onClick={() => {
                    dispatch({
                        type: 'LOGOUT',
                        info: "TEST",
                    })
                    window.location.replace("/")
                }}>Logout</Button>
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
            <h1 class="place">Places</h1>
            <div id="place-forms">
                <Form.Group class="place-name">
                    <Form.Label>Place Name</Form.Label>
                    <Form.Control onChange={(e) => {
                        setPlaceName(e.target.value)
                    }
                    } type="text" placeholder="Enter Name For Place" />
                    <Form.Text className="text-muted">
                        You can list the places here!
                    </Form.Text>
                    <Form.Label>Type</Form.Label>
                    <Form.Control onChange={(e) => {
                        setPlaceType(e.target.value)
                    }
                    } type="text" placeholder="Enter Type For Place" />
                    <Form.Text className="text-muted">
                        You name the place-type here!
                    </Form.Text>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => {
                        setPlaceDes(e.target.value)
                    }
                    } type="text" placeholder="Enter Description For Place" />
                    <Form.Text className="text-muted">
                        You describe the place here!
                    </Form.Text>
                    <Button onClick={createNewPlace}>Create New Place</Button>
                </Form.Group>
            </div>
            <h4>List of Places:</h4>
            <div id="places-list">
                {places !== undefined && places.map(place => {
                    return (
                        <div className="displayed-place">
                            <div>Name: {place.name} </div>
                            {place.type && <div>Type: {place.type}</div>}
                            {place.description && <div> {place.description}</div>}
                        </div>
                    )
                })}

            </div>

            <label for="color" id="bottom">Please select a color:</label>
            <select id="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Purple</option>
            </select></div>}
        </main>
    )
}