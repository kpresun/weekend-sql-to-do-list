console.log('js ready');

$(document).ready( () => {
    console.log('JQ ready');
    createTaskListener();
    // updateTask();
    getTaskList();
    // deleteTaskListener();

});
//---------------------Listeners below-------------------------//

/**
 * function will listen for click on create task
 */
function createTaskListener() {
    console.log('made it to createTaskListener');
    $('#create-button').on('click', () => {
        console.log('create task button clicked');
        let taskToSend = {
            name: $('#task-name').val(),
            description: $('#description').val(),
            status: $('#status-checkbox').val()
        };

        addTask(taskToSend);

    });
}

// function updateTask() {
//     console.log('made it to updateTask');
//     $('#status-checkbox').on('click', () => {
//         changeStatus();
//     });
//  }

//-----------------------------------------//

/**
 * params: taskToSend
 */
function addTask(taskToSend) {
    console.log('made it to function addTask');
    $.ajax({
        method: 'POST',
        url: '/weekendApp',
        data: taskToSend
    })
    .then((response) => {
        console.log('back on client side');
        getTaskList();
    })
    .catch((error) => {
        console.log('response did not complete', error);
    })
};



/**
 * Will refresh the taskList
 */
 function getTaskList() {
     console.log('made it to getTaskList');
     $('#task-list').empty();
     $.ajax({
         method: 'GET',
         url: '/weekendApp'
     })
     .then( (dataResult) => {
        console.log('back on client side', dataResult);
        for (let i = 0; i < dataResult.length; i++) {
            $('#task-list').append(
                `<tr>
                    <td>${dataResult[i].name}</td>
                    <td>${dataResult[i].description}</td>
                    <td id="status-selection">
                    <button type="button" id="toDo-btn" class="btn btn-danger">To Do</button>
                    <button type="button" id="doing-btn" class="btn btn-warning">Doing</button>
                    <button type="button" id="done-btn" class="btn btn-success">Done</button>
                    </td>
                    <td><button class="btn btn-danger btn-sm" data-id=${dataResult[i].id}>Delete</button></td>
                </tr>`
            );
            
        }
     })
     .catch(error => {
         console.log('response did not complete', error);
     })

 };

// function changeStatus() {
//     console.log('made it to changeStatus');
//     $.ajax({
//         method: 'PUT',
//         url: 
//     })
// }

// function deleteTask();