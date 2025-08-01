const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const successMessage = document.getElementById("success-message");
const filterButtons = document.querySelectorAll(".filters button");
const toggleMode = document.getElementById("toggle-mode");

let tasks = [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" />
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;

    li.querySelector("input").addEventListener("change", (e) => {
      tasks[index].completed = e.target.checked;
      renderTasks(currentFilter);
    });

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  showSuccess("Task Added Successfully!");
  renderTasks(currentFilter);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showSuccess("Task Deleted ✅");
  renderTasks(currentFilter);
}

function showSuccess(message) {
  successMessage.textContent = `✅ ${message}`;
  successMessage.classList.add("visible");
  setTimeout(() => {
    successMessage.classList.remove("visible");
  }, 2000);
}

let currentFilter = "all";

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.getAttribute("data-filter");
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(currentFilter);
  });
});

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleMode.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Initial render
renderTasks();
