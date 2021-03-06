const taskManager = new TaskManager(0);

// Load the tasks from localStorage
taskManager.load();
// Render the loaded tasks to the page
taskManager.render();
//Finding and Displaying the Date
const dateElement = document.querySelector("#date-element");
let today = new Date();
const [day, month, year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
// console.log(today);
let dateString = `Current Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;
let dueDateField = document.querySelector("#newTaskDueDate");
dueDateField.setAttribute('min', year + '-' + month + '-' + day);

const modalTaskForm = document.getElementById('taskForm');

//focus to name field when modal load
modalTaskForm.addEventListener('shown.bs.modal', function () {
  newTaskNameInput.focus();
});

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  //implement a JavaScript function named validFormFieldInput(data)

  let newTaskNameInput = document.querySelector('#newTaskNameInput');
  let newTaskDescription = document.querySelector('#newTaskDescription');
  let newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
  let newTaskDueDate = document.querySelector('#newTaskDueDate');
  let newTaskStatus = document.querySelector('#newTaskStatus');
  dueDateField.setAttribute('min', year + '-' + month + '-' + day);
  let validationFail = 0;

  // Prevent default action
  event.preventDefault();

  // Call this to clear all the form fields after the submission
  const clearFormFields = () => {
    newTaskNameInput.value = " ";
    newTaskDescription.value = " ";
    newTaskAssignedTo.value = " ";
    newTaskStatus.value = "In Progress";
    /*newTaskDueDate.value = " ";*/
    newTaskNameInput.classList.remove("is-valid");
    newTaskDescription.classList.remove("is-valid");
    newTaskAssignedTo.classList.remove("is-valid");
    newTaskStatus.classList.remove("is-valid");
    newTaskDueDate.classList.remove("is-valid");
  };

  // Form validation for all the Task Field
  if (newTaskNameInput.value.length > 5) {
    newTaskNameInput.classList.add("is-valid");
    newTaskNameInput.classList.remove("is-invalid");
  } else {
    newTaskNameInput.classList.add("is-invalid");
    newTaskNameInput.classList.remove("is-valid");
    validationFail++;
  }

  if (newTaskDescription.value.length > 5) {
    newTaskDescription.classList.add("is-valid");
    newTaskDescription.classList.remove("is-invalid");
  } else {
    newTaskDescription.classList.add("is-invalid");
    newTaskDescription.classList.remove("is-valid");
    validationFail++;
  }

  if (newTaskAssignedTo.value.length > 5) {
    newTaskAssignedTo.classList.add("is-valid");
    newTaskAssignedTo.classList.remove("is-invalid");
  } else {
    newTaskAssignedTo.classList.add("is-invalid");
    newTaskAssignedTo.classList.remove("is-valid");
    validationFail++;
  }

  if (newTaskDueDate.value.length != 0) {
    newTaskDueDate.classList.add("is-valid");
    newTaskDueDate.classList.remove("is-invalid");
  } else {
    newTaskDueDate.classList.add("is-invalid");
    newTaskDueDate.classList.remove("is-valid");
    validationFail++;
  }
  if (newTaskStatus.value.length != 0) {
    newTaskStatus.classList.add("is-valid");
    newTaskStatus.classList.remove("is-invalid");
  } else {
    newTaskStatus.classList.add("is-invalid");
    newTaskStatus.classList.remove("is-valid");
    validationFail++;
  }

  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into our tasks array
    taskManager.addTask(
      newTaskNameInput.value,
      newTaskDescription.value,
      newTaskAssignedTo.value,
      newTaskDueDate.value,
      newTaskStatus.value,
    );
    clearFormFields();
    taskManager.save();

    //hide modal form
    $('#taskForm').modal('hide');

    taskManager.render();
  }
});

const taskList = document.querySelector("#task-list");
// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked
  if (event.target.classList.contains("done-button")) {
    // Get the correct parent Task, yours might be slightly different
    // Use console.log(event.target.parentElement) to see
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(parentTask);
    // Get the taskId of the parent Task and turn it into a number.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'DONE'
    task.status = "Done";
    taskManager.save();
    // Render the tasks
    taskManager.render();
  }

  // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {
    let choice = confirm(event.target.getAttribute('data-confirm'));

    if (choice) {
      // Get the parent Task
      const parentTask =
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement;

      // Get the taskId of the parent Task.
      const taskId = Number(parentTask.dataset.taskId);

      // Delete the task
      taskManager.deleteTask(taskId);

      // Save the tasks to localStorage
      taskManager.save();
    }

    // Render the tasks
    taskManager.render();
  }
});