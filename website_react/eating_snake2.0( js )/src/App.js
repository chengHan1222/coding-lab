import './App.css';
import { useState } from 'react';
import StartEndGame from './component/StartEndGame';
import GameMap from './component/GameMap';
import SettingSnake from './component/SettingSnake';
import Map from './class/Map';
import BlockManager from './class/BlockManager';
import FightingEngine from './class/FightingEngine';

function App() {
	const [isSettingSnake, switchSettingSnake] = useState(false);

	BlockManager.createObjectBlock(BlockManager.calBlockSideLength(Map.updateMapSideLength()));

	let showLayoutDiv = () => {
		if (isSettingSnake) {
			FightingEngine.isSettingSnake = true;
			return <SettingSnake switchSettingSnake={switchSettingSnake}></SettingSnake>;
		}
		FightingEngine.isSettingSnake = false;
		return <StartEndGame switchSettingSnake={switchSettingSnake}></StartEndGame>;
	};

	return (
		<div className="App">
			{showLayoutDiv()}
			<GameMap></GameMap>
		</div>
	);
}

export default App;
