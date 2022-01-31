const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
    const html = `
    <li class="list-group-item">
    <div class="widget-content p-0">
        <div class="widget-content-wrapper">
            <!--<div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                    <input class="input" type="checkbox">
                    <label class="label">&nbsp;</label>
                </div>
            </div>-->
            <div class="widget-content-left">
                <div class="widget-heading">Name: ${name}</div>
                <div class="widget-description">Description: ${description}</div>
                <div class="widget-subheading"><i>Assigned To: ${assignedTo}</i></div>
                <div class="widget-subheading"><i>Due Date: ${dueDate}</i></div>
                <div class="widget-subheading"><i>Status: ${status}</i></div>
            </div>
            <!--<div class="modal-footer">
                        <button type="done" class="btn btn-success" data-bs-dismiss="modal">Done</button>
            </div>
            <div class="widget-content-right">
                <div class="badge bg-success">Completed</div>
                <button class="border-0 btn-transition btn btn-outline-success"
                    data-bs-toggle="modal" data-bs-target="#taskForm">
                    <i class="fa fa-pencil"></i>
                </button>
            </div>-->
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
    status: status
  };
  console.log(task);
  this.tasks.push(task);  
  console.log(this.tasks);
}
//Create the render method
render () {
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
}
console.log(TaskManager);

    