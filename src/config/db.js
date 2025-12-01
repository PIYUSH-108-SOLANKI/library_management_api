const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://piyushsolanki1916_db_user:YsFMjQvKK9uRDGC8@checkmatecluster.aatrtaw.mongodb.net/?appName=CheckMatecluster' , );
const db= mongoose.connection;

db.on('connected' , ()=>{

    console.log('Database connected successfully');
});

db.on('error' , (err)=>{
    console.log('Database connection error: ' + err);
});

module.exports= db;



