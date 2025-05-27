document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  // Support Enter key
  document.getElementById('task-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
  });
});

function addTask() {
  const input = document.getElementById('task-input');
  const prioritySelect = document.getElementById('priority');
  const taskText = input.value.trim();
  const priority = prioritySelect.value;

  if (taskText === '') {
    alert("Please enter a task.");
    return;
  }

  createTaskElement(taskText, false, priority);
  saveTask(taskText, false, priority);

  input.value = '';
  prioritySelect.value = 'medium';
}

function createTaskElement(taskText, completed = false, priority = 'medium') {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const priorityTag = document.createElement('span');
  priorityTag.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
  priorityTag.className = `priority ${priority}`;

  const textNode = document.createTextNode(taskText);

  const textWrapper = document.createElement('span');
  textWrapper.appendChild(priorityTag);
  textWrapper.appendChild(textNode);

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

  li.appendChild(textWrapper);
  li.appendChild(actions);

  document.getElementById('task-list').appendChild(li);
}

function saveTask(text, completed, priority) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed, priority });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
  const listItems = document.querySelectorAll('#task-list li');
  const tasks = [];

  listItems.forEach(item => {
    const priorityClass = item.querySelector('.priority').classList[1];
    tasks.push({
      text: item.childNodes[0].textContent.replace(/^(Low|Medium|High)/i, '').trim(),
      completed: item.classList.contains('completed'),
      priority: priorityClass
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed, task.priority));
}
