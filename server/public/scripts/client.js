console.log('js ready');

$(document).ready( () => {
    console.log('JQ ready');
    createTaskListener();
    updateStatus();
    getTaskList();
    deleteTaskListener();

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
            status: $('#status-input').val()
        };

        addTask(taskToSend);

    });
}

function updateStatus() {
    $('#task-list').on('click', '.status-button', () => {
        console.log('update status click is working');
        setStatus();
    })
}

function deleteTaskListener() {
    $('#task-list').on('click', '.delete-button', () => {
        console.log('delete click is working');
        deleteTask($(this).data('id'));
    })
}

// if above function doesn't work might need to change the listener directly to done-btn


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
                    <td class="current-status">${dataResult[i].status}</td>
                    <td>
                    <button type="button" class="status-button">Complete</button>
                    </td>
                    <td><button class="delete-button" data-id=${dataResult[i].id}>Delete</button></td>
                </tr>`
            );
            
        }
     })
     .catch(error => {
         console.log('response did not complete', error);
     })

 };


function setStatus() {
    if ($('.current-status').val() == false ) {
        changeStatus($(this).data('id'), true )
    }
    else if ($('.current-status').val() == true ) {
        changeStatus($(this).data('id'), false )
    }
}

//  this function will have take in some sort of parameter regarding buttons click to work
function changeStatus( taskId, taskStatus ) {
    console.log('made it to changeStatus');

    $.ajax({
        method: 'PUT',
        url: `/weekendApp/${taskId}`,
        data: {
            status: taskStatus
        },
    })
    .then((dataResults) => {
        console.log('results made it back to client side PUT');
        getTaskList();
    })
    .catch((error) => {
        console.log('results did not make it back to client PUT', error);
    });

}

function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: `weekendApp/${taskId}`
    })
    .then((response) => {
        console.log('task was deleted', response);
    })
    .catch((error) => {
        console.log('Unable to delete task', error);
    });

}
