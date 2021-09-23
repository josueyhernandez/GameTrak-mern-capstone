import React, { Component } from 'react';

import GameData from './data';

class GamesPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: GameData,
		};
	}
	render() {
		const { collections } = this.state;
		return (
			<div className='game-page'>{collections.map({...collections })}</div>
		);
	}
}

export default GamesPage;
