const express = require('express');
require('dotenv').config();
const app = express();
const bookRouter = require('./src/routes/BookRouter');


requestlogger = (req,res , next )=>{
    console.log(req);
    console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
    next();
} ; 


app.get('/' , (request , response)=>{
    console.log('Welcome to the Library Management API');
})

app.get('/health' , (request , response)=>{
    response.status(200).json({
        status: 'OK',
        message : "Server is Running Successfully"
    });
});

app.use(requestlogger);
app.use('/books/' , bookRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    
}) 

