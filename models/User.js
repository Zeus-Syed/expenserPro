const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId : {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    phoneNo: {
       type:  Number
    },
    email :{
        type: String
    },
    password : {
        type: String
    },
    createdOn : {
        type: Date
    }
}) ;

mongoose.model('User', userSchema);