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

})

//GET

router.get('/', (req,res) => {
    console.log('Inside router.get', req);
    let queryText = `SELECT * FROM fintodo;`;
    pool.query(queryText)
    .then((searchData) => {
        console.log('successfully sending back');
        res.send(searchData.rows);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
    })
})

//PUT



//DELETE



module.exports = router;