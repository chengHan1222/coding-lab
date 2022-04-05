import './App.css';
import SortableComponent from './component/SortableComponent';

function App() {
	const styles = {
		display: 'flex',
		fontFamily: 'sans-serif',
		textAlign: 'center',
	};

	return (
		<div className="App" style={styles}>
			<SortableComponent />
		</div>
	);
}

export default App;
