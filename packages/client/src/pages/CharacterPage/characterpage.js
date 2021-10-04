
import React from "react";
import "./characterpage.css"
import scorpion from "./images/scorpion.jpg"
import { useProvideUser, } from 'hooks/globalStates';

export default function CharacterPage() {
    const { state, dispatch } = useProvideUser();
    function testButton () {
        console.log(state)
    }
    function selectCharacter() {
        // let select = document.getElementById("characters")
        // // let characterValue = select.options[select.selectedIndex].value
        // let characterText = select.options[select.selectedIndex].text
        // alert("Selected Character " + characterText)
    }

    return (
        <main>
            <button onClick = {testButton}>Test Button</button>
            <div className="log">
                <button class="logout" onClick={() => window.location.replace("/")}>Logout</button>
                <button class="back" onClick={() => window.location.replace("/games")}>Back to List</button>
            </div>
            <div className="header">
                <h3><a href="/character">Character</a></h3>
                <h3><a href="/item">Items</a></h3>
                <h3><a href="/places">Places</a></h3>
                <h3><a href="/skills">Skills</a></h3>
                <h3><a href="/attributes">Attributes</a></h3>
            </div>
            <div class="character-select">
                <label for="character">Select Character: </label>
                <select name="characters" id="characters" class="characters">
                    <option value="none">None</option>
                    <option value="Scorpion">Scorpion</option>
                    <option value="sub-zero">Sub-zero</option>
                    <option value="liuKang">Liu Kang</option>
                    <option value="sonya">Sonya Blade</option>
                </select>
                <button class="submit" onClick={selectCharacter()}>Submit</button>
            </div>
                <h2><a href="/create" class="create">Create New</a></h2>

                <div>
                    {state.currentGame && <h1 class="game-title">{state.currentGame.name} Characters</h1>}
                </div>
                <div class="characterId">
                    <h2 class="characterName">None</h2>
                    <p>Name: <span class="name"></span></p>
                    <p>Gender: <span class="gender"></span></p>
                    <p>Attributes: <span class="attributes"></span></p>
                    <p>Strength: </p>
                    <p>Agility: </p>
                    <p>Endurance: </p>
                    <p>Skills: </p>
                    <div class="description">
                        <p>Description</p>
                    </div>
                    <img src={scorpion} alt="Scorpion" />
                </div>
        </main>

    )
}