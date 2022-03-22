import React from 'react';
import TestManager from '../class/TestManager';

export default class Test extends React.Component {
	componentDidMount() {
		TestManager.myFunc();

		console.log(TestManager.arrayTest);
	}

	render() {
		return <></>;
	}
}
