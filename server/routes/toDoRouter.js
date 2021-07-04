const pool = require('../modules/pool')

const express = require('express');
const { Pool } = require('pg');
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



//PUT



//DELETE



module.exports = router;