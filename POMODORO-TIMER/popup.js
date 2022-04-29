const tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

function renderTask() {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "할 일을 입력하세요...";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => { updateTask(taskNum) });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X"
  deleteBtn.addEventListener("click", () => { deleteTask(taskNum) });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTasks();
}

function updateTask(taskNum) {
  tasks[taskNum] = text.value;
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
