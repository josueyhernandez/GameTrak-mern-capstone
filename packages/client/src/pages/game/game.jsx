import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import GameData from './data';

export default function GamesPage(props) {
	function createGame() {
		console.log(GameData.type);
	}
	return (
		<main>
			<div className='game-page'>Hi</div>
			<Button onClick={createGame}>POWER</Button>
			<div className='game-list'>
				{GameData.type.map((game) => {
					return (
						<div className='game'>
							{game.name}
							<img height='125px' width='100px' src={game.imageUrl}></img>
						</div>
					);
				})}
			</div>
		</main>
	);
}
