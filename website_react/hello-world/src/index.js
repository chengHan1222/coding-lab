import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Progress() {
	const barWidth = '50%';
	return (
		<div>
			<div className="progress-back" style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: '200px', height: '7px', borderRadius: '10px' }}>
				<div className="progress-bar" style={{ backgroundColor: '#fe5196', width: barWidth, height: '100%', borderRadius: '10px' }}></div>
			</div>
		</div>
	);
}

ReactDOM.render(
	<div>
		<App />
	</div>,
	document.getElementById('root')
);

reportWebVitals();
