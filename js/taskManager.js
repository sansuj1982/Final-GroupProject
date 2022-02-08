const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {
  const html = `
<li class="list-group-item" data-task-id="${id}">
    <div class="widget-content p-0">
        <div class="widget-content-wrapper">
            <div class="widget-content-left">
                <div class="widget-heading">${name}</div>
                <div class="widget-description">${(status !== 'Done') ? description : ''}</div>
                <div class="widget-subheading"><i>${(status !== 'Done') ? assignedTo : ''}</i></div>
                <div class="widget-subheading">${(status !== 'Done') ? dueDate : ''}</div>
            </div>
            <div class="widget-content-right">
              <div class="badge ${(status === 'Done') ? 'bg-success' : 'bg-warning'}">${status}</div>
              <button class="border-0 btn-transition btn btn-outline-success ${(status === 'Done') ? 'invisible' : 'visible'}">
                <i class="fa fa-check-circle done-button"></i>
              </button>
              <button class="border-0 btn-transition btn">
                <i class="fa fa-trash delete-button" data-confirm="Are you sure you want to remove this task?"></i>
              </button>
            </div>
        </div>
    </div>
</li>
`;
  return html;

};
// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  // Create the addTask method
  addTask(name, description, assignedTo, dueDate, status) {
    // Create a task object that we will push to the list of tasks

    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };
    console.log(task);
    this.tasks.push(task);
    console.log(this.tasks);

  }
  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }
  //Create the render method
  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
        task.id,
      );
      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);

    }
    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    console.log(this.tasks);
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }

  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }
}