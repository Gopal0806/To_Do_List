document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTask(taskText);

  input.value = '';
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');
  
  li.textContent = taskText;

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    updateStorage();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  document.getElementById('task-list').appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
  const listItems = document.querySelectorAll('#task-list li');
  const tasks = [];

  listItems.forEach(item => {
    tasks.push({
      text: item.firstChild.textContent,
      completed: item.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}
