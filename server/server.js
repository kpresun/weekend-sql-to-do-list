const express = require('express');
const app = express();

const PORT = process.env.port || 5000;
const toDoRouter = require('./routes/toDoRouter')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('server/public'));

app.use('/weekendApp', toDoRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})