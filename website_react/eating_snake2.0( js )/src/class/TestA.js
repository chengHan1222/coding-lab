import TestManager from './TestManager';

export default class TestA {
	constructor() {
		TestManager.arrayTest.push(123);
		console.log('enter');
	}
}
