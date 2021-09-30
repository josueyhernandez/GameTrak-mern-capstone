import React from "react"
import "./create.css"

export default function CreatePage() {

    return (
        <main>
            <h2 class="new">Create Your Own Character</h2>
            <div class="characterImg">
                <h3>Character Name:</h3>

            </div>
            <div class="characterInput">
                <form class="form">
                    <label for="name">Name: </label>
                    <input type="text" class="charName" required></input><br></br>
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
                    <textarea type="textarea"></textarea><br></br>
                    <input type="submit" id="submit" value="Submit"></input>
                </form>
            </div>
            <div>
            <button class="characterPage" onClick={() => window.location.replace("/character")}>Character Page</button>
            </div>
        </main>
    )
}