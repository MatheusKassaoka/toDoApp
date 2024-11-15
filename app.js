document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask(taskInput.value);
    taskInput.value = '';
});

function addTask(task) {
    const tasks = getTasksFromLocalStorage();
    const taskId = new Date().getTime();
    tasks.push({ id: taskId, description: task, completed: false });
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed-task' : ''}`;
        listItem.innerHTML = `
            <span>${task.description}</span>
            <div>
                <button class="btn action-btn complete-btn" onclick="completeTask(${task.id})"><i class="fas fa-check"></i></button>
                <button class="btn action-btn edit-btn" onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                <button class="btn action-btn delete-btn" onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

function completeTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function editTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const newDescription = prompt('Edit task description:', tasks[taskIndex].description);
    if (newDescription) {
        tasks[taskIndex].description = newDescription;
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function deleteTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);
    renderTasks();
}
