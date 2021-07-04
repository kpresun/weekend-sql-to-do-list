const pool = require('../modules/pool')

const express = require('express');
const router = express.Router();
//---------router code above, calls below-------//

//POST

router.post('/', (req,res) => {
    console.log('Inside router.post', req);
    const taskData = req.body;
    const queryText = `INSERT INTO fintodo ("name", "description")
                        VALUES ($1, $2);`;
    pool.query( queryText, [taskData.name, taskData.description] )
    .then((dbResponse) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
    })

});

//GET

router.get('/', (req,res) => {
    console.log('Inside router.get', req);
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
    const taskID = req.params.id;
    let queryText = '';
    if (taskStatus === true) {
        queryText = `UPDATE fintodo SET "status" = false WHERE id = $1;`;
    } else if (taskStatus === false) {
        queryText = `UPDATE fintodo SET "status" = true WHERE id = $1;`;
    }
    pool.query(queryText, [taskID.id])
    .then((dbResponse) => {
        console.log('successfully updated status', dbResponse.rows);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making update to task', error);
        res.sendStatus(500);
    })

});

//DELETE



module.exports = router;