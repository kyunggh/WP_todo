class TodoItem {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

class TodoList {
  constructor() {
    this.items = [];
  }

  add(title, dueDate) {
    const item = new TodoItem(title, dueDate);
    this.items.push(item);
    this.saveToLocalStorage();
    return item;
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  toggleComplete(item) {
    item.toggleComplete();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    const items = localStorage.getItem('todoList');
    if (items) {
      this.items = JSON.parse(items);
    }
  }
}

const todoList = new TodoList();
const todoForm = document.getElementById('todoForm');
const todoListContainer = document.getElementById('todoList');
const addTodoButton = document.getElementById('addTodoButton');

function renderTodoItem(item) {
  const li = document.createElement('li');
  li.classList.toggle('completed', item.completed);

  const titleText = document.createElement('span');
  titleText.textContent = `${item.title} - ${item.dueDate}`;

  const toggleButton = document.createElement('button');
  toggleButton.textContent = '✔️';
  toggleButton.addEventListener('click', () => {
    todoList.toggleComplete(item);
    renderTodoList();
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = '🗑️';
  removeButton.addEventListener('click', () => {
    todoList.remove(item);
    renderTodoList();
  });

  li.appendChild(toggleButton);
  li.appendChild(removeButton);
  li.appendChild(titleText);
  todoListContainer.appendChild(li);
}

function renderTodoList() {
  todoListContainer.innerHTML = '';
  todoList.items.forEach(renderTodoItem);
}

addTodoButton.addEventListener('click', () => {
  const titleInput = document.getElementById('title');
  const dueDateInput = document.getElementById('dueDate');
  const title = titleInput.value.trim();
  const dueDate = dueDateInput.value;
  if (title && dueDate) {
    const newItem = todoList.add(title, dueDate);
    renderTodoItem(newItem);
    titleInput.value = '';
    dueDateInput.value = '';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  todoList.loadFromLocalStorage();
  renderTodoList();
});
