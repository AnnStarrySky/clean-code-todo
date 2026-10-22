const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const incompleteTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  //innerText encodes special characters, HTML does not.
  label.innerText = taskText;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  const listItem = createNewTaskElement(taskText);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");

  if (isEditing) {
    const newText = editInput.value.trim();
    if (!newText) return;
    label.innerText = newText;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const toggleTask = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTasksList;
  targetList.appendChild(listItem);
};

addButton.onclick = addTask;

const bindTaskEvents = function (listItem) {
  const checkBox = listItem.querySelector("input[type=checkbox]");
  const editButton = listItem.querySelector("button.edit");
  const deleteButton = listItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTask;
};

for (const listItem of document.querySelectorAll("li")) {
  bindTaskEvents(listItem);
}
