document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.done));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(listItem => {
            tasks.push({ text: listItem.querySelector('span').textContent, done: listItem.classList.contains('list-group-item-success') });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(task, done = false) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        if (done) listItem.classList.add('list-group-item-success');
        listItem.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="btn btn-sm btn-warning edit-button">Edit</button>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('li');
        if (e.target.classList.contains('delete-button')) {
            listItem.remove();
            saveTasks();
        }
        if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
            saveTasks();
        }
        if (e.target.classList.contains('edit-button')) {
            const span = listItem.querySelector('span');
            const newTask = prompt('Edit Task:', span.textContent);
            if (newTask) {
                span.textContent = newTask.trim();
                saveTasks();
            }
        }
    });

    loadTasks();
});
