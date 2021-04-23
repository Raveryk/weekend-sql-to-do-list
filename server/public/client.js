
$(document).ready(onReady) 

function onReady() {
    console.log('jQuery is working!!');
    // click handlers to add new task
    $('#task-btn').on('click', addTask);
    // to mark a task as complete
    $('#task-view').on('click', '.task-complete', completeTaskHandler);
    // to delete a task
    $('#task-view').on('click', '.task-delete', deleteTaskHandler)

    getTasks();
};



function addTask() {
    console.log('Add task button clicked.');
    
    let newTask = {
        task: $('#task-input').val(),
        due_date: $('#date-input').val(),
        isComplete: false
    };
    saveTask(newTask);
    
}



//GET ajax call
function getTasks() {
    console.log('In getTasks');
    $('#task-view').empty();

    $.ajax({
        type: 'GET',
        url: '/to-do'
    }).then(response => {
        console.log(response);
        //loop through response array to GET all tasks
        for( let job of response ) {
            $('#task-view').append(`<tr>
            <td>${job.task}</td>
            <td>${job.due_date}</td>
            <td>${job.isComplete}</td>
            <td><button class="task-complete" data-id="${job.id}">Task Complete</button></td>
            <td><button class="task-delete" data-id="${job.id}">Delete</button></td>
            </tr>`);
        } //end loop
    }).catch(error => {
        console.log('error in GET call', error);
    });
    
}


//POST ajax call
function saveTask(newTask) {
    console.log('In saveTask', newTask);
    
    $.ajax({
        type: 'POST',
        url: '/to-do',
        data: newTask
    }).then(response => {
        console.log('Response from server', response);
        getTasks();
    }).catch(error => {
        console.log('There was an error during ajax POST call', error);
        alert('Unable to add task. Please try again later.');   
    })
}


//PUT ajax call
function completeTask(taskId) {
    $.ajax({
        method: 'PUT',
        url: `/to-do/${taskId}`,
        data: taskId
    })
    .then(response => {
        console.log('You updated a task!');

        getTasks();     
    })
    .catch(error => {
        console.log('Error updating task', error);   
    })
}

function completeTaskHandler() {
    completeTask($(this).data("id"));
}


//DELETE ajax call
function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: `/to-do/${taskId}`
    })
    .then(response => {
        console.log('You DELETED a task!');
        
        getTasks();
    })
    .catch(error => {
        console.log('Something went wrong trying to Delete the task', error);    
    })
}

function deleteTaskHandler() {
    deleteTask($(this).data("id"));
}


//AppendToDom
function renderTasks() {

}
