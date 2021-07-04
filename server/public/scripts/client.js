console.log('js ready');

$(document).ready( () => {
    console.log('JQ ready');
    createTaskListener();
    getTaskList();
    // deleteTaskListener();

});

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
                    <td><input type="checkbox" id=status-checkbox>
                    <label for="status-checkbox">Check when complete</label></td>
                    <td><button class="btn btn-danger btn-sm" data-id=${dataResult[i].id}>Delete</button></td>
                </tr>`
            );
            
        }
     })
     .catch(error => {
         console.log('response did not complete', error);
     })

 };

// function deleteTask();