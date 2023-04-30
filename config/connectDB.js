const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to DataBase');
    }
    catch(err){
        console.log('Error connecting to DB ', err);
    }
}

module.exports = connectDB;