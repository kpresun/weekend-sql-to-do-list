const pool = require('../modules/pool')

const express = require('express');
const router = express.Router();
//---------router code above, calls below-------//

//POST

router.post('/', (req,res) => {
    console.log('Inside router.post', req);
    const taskData = req.body;
    const queryText = `INSERT INTO fintodo ("name", "description", "status")
                        VALUES ($1, $2, $3);`;
    pool.query( queryText, [taskData.name, taskData.description, taskData.status] )
    .then((dbResponse) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
    })

});

//GET

router.get('/', (req,res) => {
    console.log('Inside router.get');
    let queryText = `SELECT * FROM fintodo;`;
    pool.query(queryText)
    .then((searchData) => {
        console.log('successfully sending back through router get');
        res.send(searchData.rows);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
    })

});

//PUT

router.put('/:id', (req,res) => {
    console.log('inside router.put', req.params.id);
    const taskStatus = req.body.status;
    const taskId = req.params.id;
    let queryText = `UPDATE fintodo SET "status"=NOT "status" WHERE id = $1;`;
    pool.query(queryText, [taskId])
    .then((dbResponse) => {
        console.log('successfully updated status');
        res.sendStatus(201);
    })
    .catch((error) => {
        // console.log('error making update to task', error);
        res.sendStatus(500);
    })

});

//DELETE

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log(`task id is ${taskId}`);
    const queryText = `DELETE FROM fintodo WHERE "id" = $1;`;
    pool.query(queryText, [taskId])
    .then((dbResponse) => {
        console.log(`successfully deleted task server side`);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Could not delete task with id ${taskId} on server side`, error);
        res.sendStatus(500);
    })
});


module.exports = router;