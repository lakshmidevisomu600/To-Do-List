document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from local storage
    loadTasks();
    
    addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    saveTasks();
    }
    });
    
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
    deleteTask(e.target.parentElement);
    } else if (e.target.tagName === 'LI') {
    toggleTask(e.target);
    }
    });
    
   function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.className = 'task';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    }
    
    function deleteTask(task) {
    taskList.removeChild(task);
    saveTasks();
    }
    
    function toggleTask(task) {
    task.classList.toggle('completed');
    saveTasks();
    }
    
    function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
    tasks.push({
    text: task.firstChild.textContent,
    completed: task.classList.contains('completed')
    });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    
    function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
    addTask(task.text);
    if (task.completed) {
    document.querySelector('.task:last-child').classList.add('completed');
    }
    });
    }
    });