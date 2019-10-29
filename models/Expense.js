const mongoose = require('mongoose');

const time = require('../libs/timeLib')
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    expName: {
        type: String
    },
    expId :{
        type: String,
        unique: true
    },
    groupId : {
        type: String,
    },
    expAdder:{
        type: String
    },
    payerName : {
type: String
    },
    payerId: {
type: String
    },
    amount: {
        type: Number
    },
    createdOn: {
        type: Date,
        default: time.now()
    } 


}) // expenseSchema


mongoose.model('Expense', expenseSchema);