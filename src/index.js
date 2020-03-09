const express = require('express');

const routes = require('./routes');
const _ = require('./database');


const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server sunning at port ${port}`);
});
