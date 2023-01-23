let tasksList = [];

const elem = {
	form: document.querySelector('.new-task__form'),
	addVal: document.querySelector('.js-task-input'),
	addBtn: document.querySelector('.js-btn-add'),
	tasks: document.querySelector('.task__list'),
};

elem.addBtn.addEventListener('click', addTask);
elem.addVal.addEventListener('keyup', function(e){
	if(e.keyCode === 13) {
		addTask();
	}
})
elem.tasks.addEventListener('click', removeTask);
elem.tasks.addEventListener('click', doneTask);

if(localStorage.getItem('tasks')) {
	tasksList = JSON.parse(localStorage.getItem("tasks"));
	tasksList.forEach((item) => outTaskHTML(item));
}


function addTask() {

	if(!elem.addVal.value) return;


	let task = {
		id: Date.now(),
		taskText: elem.addVal.value,
		complet: false,
	};

	tasksList.push(task);
	
	outTaskHTML(task);

	addLocalStorage(tasksList);

}

function removeTask(event) {
	
	if(event.target.dataset.action !== 'remove') return;

	const idTask = Number(event.target.closest('li').id);

	let task = tasksList.findIndex((item) => item.id === idTask);

	tasksList.splice(task, 1);

	addLocalStorage(tasksList);
		
	event.target.closest('li').remove();

	if(elem.tasks.children.length === 1) {
		document.querySelector('.empty-text').classList.remove('none');
	}
}

function doneTask(event) {

	if(event.target.dataset.action !== 'done') return;

	let parentList = event.target.closest('li');

	const idTask = Number(parentList.id);
	
	let task = tasksList.find((item) => item.id === idTask);
	task.complet = !task.complet;

	addLocalStorage(tasksList);

	parentList.querySelector('.task-item__text').classList.toggle('task-done');

}

function addLocalStorage (tasks){
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function outTaskHTML(tasks) {

	let taskHTML = `
		<li id="${tasks.id}" class="task__item">
				<span class="task-item__text">${tasks.taskText}</span>
				<div class="task-item__buttons">
					<button type="button" data-action="done" class="button-done">
						<img class="button-img" src="img/done.png" alt="img: done">
					</button>
					<button type="button" data-action="remove" class="button-remove">
						<img class="button-img" src="img/remove.png" alt="img: remove">
					</button>
				</div>
			</li>
	`;

	let countTasks = elem.tasks.children.length;
	elem.addVal.value = "";
	elem.tasks.insertAdjacentHTML('beforeend', taskHTML);
	 if(countTasks > 0) {
		document.querySelector('.empty-text').classList.add('none');
	}

}