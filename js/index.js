const taskManager = new TaskManager(0);
//Finding and Displaying the Date
const dateElement = document.querySelector("#date-element");
let today = new Date();
const [day, month, year] = [today.getDate(), today.getMonth()+1, today.getFullYear()];
console.log(today);
let dateString = `Current Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;


// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
//implement a JavaScript function named validFormFieldInput(data)

    let newTaskNameInput = document.querySelector('#newTaskNameInput');
    console.log("name:  " + newTaskNameInput.value);
    let newTaskDescription = document.querySelector('#newTaskDescription');
    console.log("description:  " + newTaskDescription.value);
    let newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    console.log("assigned to:  " + newTaskAssignedTo.value);
    let newTaskDueDate = document.querySelector('#newTaskDueDate');
    console.log("due date:  " + newTaskDueDate.value);
    let newTaskStatus = document.querySelector('#newTaskStatus');
    console.log("status:  " + newTaskStatus.value);
    let validationFail = 0;
    
     // Prevent default action
     event.preventDefault();

// Form validation for Task Field 
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
        
    } else {
        // Push the valid input into our tasks array
        taskManager.addTask(
          newTaskNameInput.value,
          newTaskDescription.value,
          newTaskAssignedTo.value,
          newTaskDueDate.value,
          newTaskStatus.value,
        );
        taskManager.render();
        
        }    
   

});





