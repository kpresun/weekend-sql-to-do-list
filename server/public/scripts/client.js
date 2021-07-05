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
        clearInputs();
    });

}

function updateStatus() {
    $('#task-list').on('click', '.status-button', function() {
        console.log('update status click is working', $(this).parent().parent().data());
        changeStatus($(this).parent().parent().data());
    })
}


function deleteTaskListener() {
    $('#task-list').on('click', '.delete-button', () => {
        console.log('delete click is working');
        deleteTask($('.delete-button').data('id'));
        console.log($('.delete-button').data('id'));
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
                `<tr data-status="${dataResult[i].status}" data-id="${dataResult[i].id}">
                    <td>${dataResult[i].name}</td>
                    <td>${dataResult[i].description}</td>
                    <td>${dataResult[i].status}</td>
                    <td><button type="button" class="status-button">Complete</button></td>
                    <td><button class="delete-button" >Delete</button></td>
                </tr>`
            );
            
        }
     })
     .catch(error => {
         console.log('response did not complete', error);
     })

 };


//  this function will have take in some sort of parameter regarding buttons click to work
function changeStatus( task ) {
    console.log('made it to changeStatus', task);

    $.ajax({
        method: 'PUT',
        url: `/weekendApp/${task.id}`,
        data: {
            status: task.status
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
        url: `weekendApp/${taskId}`,
    })
    .then((response) => {
        console.log('task was deleted', response);
        getTaskList();
    })
    .catch((error) => {
        console.log('Unable to delete task', error);
    });

}


function clearInputs() {
    $('#task-name').val('');
    $('#description').val('');
    $('#status-input').val('');
}