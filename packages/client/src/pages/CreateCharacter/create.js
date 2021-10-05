import React, { useState } from "react"
import "./create.css"
import { useProvideUser } from "hooks/globalStates"
import axios from "axios"

const initialState = {
    name: null,
    description: null,
    image: ""
}
export default function CreatePage() {
    const { state, dispatch } = useProvideUser()
    const [input, setInput] = useState()
    const [image, setImage] = useState()
    function changeInput(e) {
        let target = e.target.name;
        setInput({
            ...input,
            [target]: e.target.value

        })
        console.log(input)
    }
    const changeCharacterImage = async (event) => {
        const imageToUpload = event.target.files[0]
        console.log(imageToUpload)
        let formData = new FormData();
        formData.append('image', imageToUpload);
        const uploadedImage = await axios.post('/api/upload',formData)
        console.log(uploadedImage.data);
        setImage(uploadedImage.data)
      }
      function test(){
          console.log(input)
      }

    return (
        <main>
            <button onClick = {test}>Test</button>
            <div id="character-creation-screen">
                <h2 class="new">Create Your Own Character</h2>
                
                <div class="characterInput">
                    <form class="form" onChange={changeInput}>
                        <label for="name">Name: </label>
                        <input type="text" name="name" class="charName" required></input><br></br>
                        <label for="gender">Gender: </label>
                        <input type="text" class="charGender"></input><br></br>
                        <label for="attributes">Attributes: </label>
                        <input type="number" class="charAttributes"></input><br></br>
                        <label for="strength">Strength: </label>
                        <input type="number" class="strength"></input><br></br>
                        <label for="Agility">Agility: </label>
                        <input type="number" class="agility"></input><br></br>
                        <label for="endurance">Endurance: </label>
                        <input type="number" class="endurance"></input><br></br>
                        <label for="Skills">Skills: </label>
                        <input type="text" class="skills"></input><br></br>
                        <label for="description">Description: </label>
                        <textarea type="textarea" name="description"></textarea><br></br>
                        <label for="upload">Upload an image for your character here!</label>
                        <input type="file" onChange={changeCharacterImage} /><br />
                        <input type="submit" id="submit" value="Submit" onClick={
                            async (e) => {
                                e.preventDefault()
                                console.log(image)
                                await axios.post
                                    ("/api/chars/", {
                                        name: input.name,
                                        description: input.description,
                                        game: state.currentGame.id,
                                        image
                                    }).then((res) => {
                                        console.log(res.data)
                                    })
                            }
                        }></input>
                    </form>
                </div>
                <div>
                    <button class="characterPage" onClick={() => window.location.replace("/character")}>Character Page</button>
                </div>
            </div>
        </main>
    )
}