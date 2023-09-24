const tasksContainer = document.querySelector(".tasks-container");
const inputBox = document.getElementById("inputBox");

inputBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addTask();
  }
});

function addTask() {
  const taskName = inputBox.value;
  if (taskName === "") {
    const emptycontainerAlert = document.querySelector(".emptycontainerAlert");
    emptycontainerAlert.classList.add("active");
    setTimeout(() => emptycontainerAlert.classList.remove("active"), 2000);
    return;
  }

  const tasksContainerList = document.createElement("li");
  const uncheckedbox = document.createElement("i");
  uncheckedbox.classList.add("bx", "bx-checkbox");
  const tasksItem = document.createElement("span");
  tasksItem.classList.add("spanText");
  tasksItem.innerText = taskName;

  const tasksContainerButton = document.createElement("div");
  tasksContainerButton.classList.add("tasks-container-buttons");

  const editButton = document.createElement("button");
  editButton.classList.add("editTask");
  editButton.innerHTML = "EDIT";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteTask");

  deleteButton.innerHTML = "DELETE";

  inputBox.value = "";
  tasksContainerButton.appendChild(editButton);
  tasksContainerButton.appendChild(deleteButton);
  tasksContainerList.appendChild(uncheckedbox);
  tasksContainerList.appendChild(tasksItem);
  tasksContainerList.appendChild(tasksContainerButton);
  tasksContainer.appendChild(tasksContainerList);

  tasksContainerList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      toggleCheckBox(e.target);
    } else if (e.target.tagName === "BUTTON") {
      if (e.target.innerHTML === "DELETE") {
        e.target.parentElement.parentElement.remove();
      } else {
        editButtons(e.target.parentElement.parentElement);
      }
    }
  });
}

function editButtons(target) {
  const currentTask = target.querySelector("span");
  const currentTaskText = currentTask.innerText;
  currentTask.style.display = "none";

  const editSpan = document.createElement("span");

  editSpan.classList.add("inputEditBox");
  editSpan.contentEditable = "true"; // Allow inline editing
  editSpan.innerText = currentTaskText;

  const saveButton = document.createElement("button");
  saveButton.innerHTML = "SAVE";
  const tasksContainerButtons = target.querySelector(
    ".tasks-container-buttons"
  );
  hideButtons(target);
  target.appendChild(editSpan);

  tasksContainerButtons.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    const editedTaskName = editSpan.innerText;
    if (editedTaskName === "") {
      alert("Write something");
      return;
    }
    saveButton.remove();
    currentTask.innerText = editedTaskName;
    currentTask.style.display = "inline-block";
    editSpan.remove();
    showButtons(target);
  });
}

function toggleCheckBox(target) {
  const checkBox = target.querySelector("i");
  const tasksItem = target.querySelector("span");

  checkBox.classList.toggle("bx-check-square");
  tasksItem.classList.toggle("linethrough-task");
}

function hideButtons(target) {
  const tasksContainerButtons = target.querySelector(
    ".tasks-container-buttons"
  );

  const deleteButton = tasksContainerButtons.querySelector(".deleteTask");
  const editButton = tasksContainerButtons.querySelector(".editTask");

  deleteButton.style.display = "none";
  editButton.style.display = "none";
}

function showButtons(target) {
  const tasksContainerButtons = target.querySelector(
    ".tasks-container-buttons"
  );

  const deleteButton = tasksContainerButtons.querySelector(".deleteTask");
  const editButton = tasksContainerButtons.querySelector(".editTask");

  deleteButton.style.display = "inline-block";
  editButton.style.display = "inline-block";
}
