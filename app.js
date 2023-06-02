const express = require('express');
const app = new express();

//logger
const morgan = require('morgan');
app.use(morgan('dev'));

//define the env variables
require('dotenv').config();
const PORT = process.env.PORT;

//connecting to the CRUD definitions
const route1 = require('./routes/sample')
app.use('/casestudy',route1);

//PORT Definition
app.listen(PORT,()=>{
    console.log(`${PORT}`);
    console.log("Server is running");
});

