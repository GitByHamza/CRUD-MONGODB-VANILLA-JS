const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud')
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.error('Connection Error', err));


const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required:true,
    },
    Surname:{
        type: String,
        required:true,
    },
    DateOfBirth:{
        day:{
            type:String,
            required:true
        },
        month:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true,
            
        }
    },
    gender:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
        match:[/^\S+@\S+\.\S+$/,'Please use a valid Email Address']
    },
    password: {
        type: String,
        required:true
    },
});

const user = mongoose.model("users", userSchema);

module.exports = user;