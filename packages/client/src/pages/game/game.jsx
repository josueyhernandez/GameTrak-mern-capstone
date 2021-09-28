import React, { Component } from 'react';

import GameData from './data';

class GamesPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: GameData.type,
		};
	}
	render() {
		const { collections } = this.state;
		return (
			<div className='game-page'>
				{collections.map((game) => (
					<div key={game.id}>{game.name}</div>
				))}
			</div>
		);
	}
}

export default GamesPage;
