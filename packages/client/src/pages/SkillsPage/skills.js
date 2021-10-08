import React, { useState, useEffect } from "react"
import "./skills.css"
import { useProvideStyle } from 'hooks/useStyle';
import { Button, Dropdown, Form } from "react-bootstrap"
import { useProvideUser, } from 'hooks/globalStates'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function SkillsPage() {
    const { state, dispatch } = useProvideUser()
    const [skillName, setSkillName] = useState()
    const [skillDes, setSkillDes] = useState()
    const [skillType, setSkillType] = useState()
    const [skills, setSkills] = useState()
    const colorScheme = useProvideStyle()
    const [validated, setValidated] = useState(true);
    async function validateToken() {
		if (state) {
            console.log("test")
			await axios
				.post('/api/auth', {
					token: state.token
				})
				.then((res) => {
					setValidated(res.data._id === state.id)
					console.log(res.data)
				})
                .catch((err)=>{
                    setValidated(false)
                })
		}
	}
	useEffect(validateToken,[state])

    document.body.setAttribute("id", colorScheme.getStyle())
    async function showSkills() {
        if (state.currentGame !== null) {
            await axios.get(`/api/skill/${state.currentGame.id}`)
                .then((res) => {
                    setSkills(res.data)
                })
        }
    }
    function setColor(color) {
        console.log(color.target.value)
        colorScheme.setNewStyle(color.target.value)
        document.body.id = colorScheme.getStyle()
    }
    //function goes here
    async function createNewSkill() {
        await axios.post("/api/skill",
            {
                name: skillName,
                type: skillType,
                description: skillDes,
                game: state.currentGame.id
            })
            .then((res) => {
                console.log(res)
                showSkills()
            })
    }
    useEffect(showSkills, [state])

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

            <h1 class="skill">Skills</h1>
            <div id="skill-forms">
                <Form.Group class="skill-name">
                    <Form.Label>Skill Name</Form.Label>
                    <Form.Control onChange={(e) => {
                        setSkillName(e.target.value)
                    }
                    } type="text" placeholder="Enter Name For Skill" />
                    <Form.Text className="text-muted">
                        You can list the skills here!
                    </Form.Text>
                    <Form.Label>Type</Form.Label>
                    <Form.Control onChange={(e) => {
                        setSkillType(e.target.value)
                    }
                    } type="text" placeholder="Enter Type For Skill" />
                    <Form.Text className="text-muted">
                        You name the skill-type here!
                    </Form.Text>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => {
                        setSkillDes(e.target.value)
                    }
                    } type="text" placeholder="Enter Description For Skill" />
                    <Form.Text className="text-muted">
                        You describe the skill here!
                    </Form.Text>
                    <Button onClick={createNewSkill}>Create New Skill</Button>
                </Form.Group>
                <h4>List of Skills:</h4>
                <div id="skills-list">
                    {skills !== undefined && skills.map(skill => {
                        return (
                            <div className="displayed-skill">
                                <div>Name: {skill.name} </div>
                                {skill.type && <div>Type: {skill.type}</div>}
                                {skill.description && <div> {skill.description}</div>}
                            </div>
                        )
                    })}

                </div>
            </div>



<<<<<<< HEAD
            <label for="color" id="bottom">Please select a color:</label>
=======
            <label for="color">Please select a color:</label>
>>>>>>> 02eaa6e (rebase)
            <select id="color" onChange={setColor}>
                <option value="green">Green and Purple</option>
                <option value="red">Red and Blue</option>
                <option value="blue">Blue and Yellow</option>
            </select></div>}
        </main>
    )
}