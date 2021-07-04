console.log('js ready');

$(document).ready( () => {
    console.log('JQ ready');
    createTaskListener();
    getTaskList();
    deleteTaskListener();

});

/**
 * function will listen for click on create task
 */
function createTaskListener() {
    console.log('made it to createTaskListner');
    $('#create-button').on('click', () => {
        console.log('create task button clicked');
        let taskToSend = {
            name: $('#task-name').val();
            description: $('#description').val();
            status: $('#status-checkbox').val();
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
        console.log('back at ');
        getTaskList();
    })
    .catch((error) => {
        console.log('task did not send' error);
    })
};



/**
 * Will refresh the tasklist
 */
 function getTaskList();

function deleteTask();