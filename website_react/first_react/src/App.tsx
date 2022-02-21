import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';


function App(props) {

	let [tasks, setTasks] = useState(props.tasks);
	const taskList = tasks.map((task) => <Todo key={task.id} id={task.id} name={task.name} completed={task.completed} />);

	const tasksNoun = (taskList.length === 1)? "task" : "tasks";
	const headingText = `${taskList.length} ${tasksNoun} remaining`;


	function addTask(name: String) {
		const newTask = {id: "todo-" + nanoid(), name: name, completed: false};
		setTasks([...tasks, newTask]);
	}


	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				<FilterButton value={'all'} pressed={true} />
				<FilterButton value={'Active'} pressed={false} />
				<FilterButton value={'Completed'} pressed={false} />
			</div>
			<h2 id="list-heading">{headingText}</h2>
			<ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
				{taskList}
			</ul>
		</div>
	);
}

export default App;
