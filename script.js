const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

let tasks = [];
let nextTaskId = 0;

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    nextTaskId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText) {
  tasks.push({ id: nextTaskId++, text: taskText });
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function editTask(taskId, newText) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].text = newText;
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const newListItem = document.createElement('li');
    const taskSpan = document.createElement('span'); // Wrap task text in a span
    taskSpan.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        editTask(task.id, newText);
      }
    });

    newListItem.appendChild(taskSpan); // Append span before buttons
    newListItem.appendChild(deleteButton);
    newListItem.appendChild(editButton);
    taskList.appendChild(newListItem);
  });
}


addTaskButton.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    newTaskInput.value = '';
  }
});

loadTasks();
