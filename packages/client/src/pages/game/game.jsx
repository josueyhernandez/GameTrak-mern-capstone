import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import GameData from './data';
import { useProvideUser, } from 'hooks/globalStates';
import { useState, useEffect } from 'react';
import { useProvideStyle } from 'hooks/useStyle';
const axios = require('axios');


const defaultName = ""
export default function GamesPage(props) {
	const [game, setGame] = useState(defaultName)
	const [newImage, setNewImage] = useState()
	const { state, dispatch } = useProvideUser();
	const [list, setList] = useState([]);
	const colorScheme = useProvideStyle();
	const [validated, setValidated] = useState(true);
	const [validateNum, setValidateNum] = useState(0)

	document.body.setAttribute("id", colorScheme.getStyle())
	async function validateToken() {
		if (state) {
			await axios
				.post('/api/auth', {
					token: state.token
				})
				.then((res) => {
					setValidated(res.data._id === state.id)
					console.log(res.data)
				})
				.catch((err) => {
					setValidated(false)
				})
		}
	}
	useEffect(validateToken, [state])
	async function test() {
		console.log(GameData.type)
		console.log(state)
		console.log(state.games)
		state.games.map(async function (id) {
			await axios
				.get(`/api/games/${id}`)

		})
	}
	const changeGameImage = async (event) => {
		const imageToUpload = event.target.files[0]
		console.log(imageToUpload)
		let formData = new FormData();
		formData.append('image', imageToUpload);
		const uploadedImage = await axios.post('/api/upload', formData)
		console.log(uploadedImage.data);
		setNewImage(uploadedImage.data)
	}
	async function createGame() {
		// await axios
		// .post("/api/games",{
		// 	title: "untitledddd",
		// 	owner: state.username,
		// })
		// .then(res => {
		// 	console.log(res.data)
		// }).catch((err=>console.log(err)))
		if (game.length > 0) {
			await axios
				.put("/api/users/add-game", {
					game,
					id: state.id,
					image: newImage
				})
				.then(res => {
					console.log(res)
					dispatch({
						type: 'CHANGE_USER',
						info: res.data.userFound,
					})
					// dispatch here res.data stuff
				})
				.catch(err => console.log(err))

		} else {
			await axios
				.put("/api/users/add-game", {
					game: "untitled",
					id: state.id,
					image: newImage
				})
				.then(res => {
					console.log(res)
					dispatch({
						type: 'CHANGE_USER',
						info: res.data.userFound,
						token: state.token
					})
					// dispatch here res.data stuff
				})
				.catch(err => console.log(err))
		}
	}
	function listGames() {
		const listOfGames = []
		if (state.games) {
			state.games.forEach(async game => {
				let id = null
				let name = null
				let image = null
				await axios
					.get(`/api/games/${game}`)
					.then(res => {
						id = res.data._id
						image = res.data.image
						name = res.data.title
					})
				listOfGames.push({
					id,
					image,
					name
				})
				setList([...listOfGames])
			}
			)

		}

		console.log("List Of Games ", listOfGames)
	}
	function showMe(e) {
		dispatch({
			type: 'SELECT_GAME',
			info: "TEST",
		})
		console.log(e)
	}
	function changeName(e) {
		setGame(e.target.value)
	}
	async function findUser() {
		let user = null
		await axios.post("/api/users/refresh/", {
			username: state.username
		})
			.then(res => {
				console.log(res)
				user = res
			})
		return user
	}

	function setColor(color) {
		console.log(color.target.value)
		colorScheme.setNewStyle(color.target.value)
		document.body.id = colorScheme.getStyle()
	}


	useEffect(listGames, [state])


	return (
		<main>
			{validated ? <h3 className='game-page'>Welcome, {state.username}!</h3> :
				<div className="main">
					{/* <h3>You are not authorized to use this page yet </h3>
					<button onClick={() => {
						window.location.replace("/")
					}}>Go Back To Login</button> */}
				</div>
			}
			{state.currentGame && validated && <h4>You were previously working on the game, {state.currentGame.name} </h4>}
			{validated && <Button onClick={validateToken}>TEST</Button>}
			{validated && <span className='game-maker'>
				<div className="buttons">
					<Button onClick={createGame}>New Game</Button>
					<Button onClick={() => {
						dispatch({
							type: 'LOGOUT',
							info: "TEST",
						})
						window.location.replace("/")
						// create a logout dispatch
					}}>Logout</Button>
				</div>

				<Form.Group id="new-game">
					<Form.Label>New Game Name:</Form.Label>
					<Form.Control
						type="game-name"
						name="game-name"
						value={game}
						onChange={changeName}
					>
					</Form.Control>
					<Form.Label>Upload your image for the game here:</Form.Label>
					<Form.Control
						type="file"
						name="game-image"

						onChange={changeGameImage}
					>
					</Form.Control>
				</Form.Group>
			</span>}
			{/* <Button onClick={showMe}>name of your stuff</Button> */}
			{validated && <div className="game-list">
				{
					list.map(game => {
						return (
							// <a href={"/character"}>
							<div value={game} key={game.id} className="game">
								<div>{game.name}</div>
								{/* <div>{game.id}</div> */}
								<img height="125px" width="100px" src={game.image}></img>
								<div className="game-icons">
									<div className="icon" onClick={
										() => {
											dispatch({
												type: 'SELECT_GAME',
												info: game,
											})
											window.location.replace("/character")
										}
									}>
										<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
											<path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" />
											<path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" />
										</svg>
									</div>
									<div className="icon" onClick={async () => {

										await axios.delete('/api/games/', {
											data: {
												gameId: game.id,
												userId: state.id
											}
										})
											.then(res => {
												if (res.status === 200) {
													dispatch({
														type: 'CHANGE_USER',
														info: state,
													})
												}

											})
										let user = null
										await axios.post("/api/users/refresh/", {
											username: state.username
										})
											.then(res => {
												// console.log(res)
												user = res
											})
										console.log(user)
										dispatch({
											type: 'CHANGE_USER',
											info: user.data,
										})
										window.location.reload();

									}
									}>
										<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
										</svg>
									</div>
								</div>
							</div>
							// </a>
						)
					})
				}
			</div>
			}
			{validated &&
				<select name="color" onChange={setColor}>
					<option value="green">Green and Purple</option>
					<option value="red">Red and Blue</option>
					<option value="blue">Blue and Yellow</option>
				</select>}
		</main>

	)
}
