const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const time = require('../libs/timeLib');

const HistorySchema = new Schema({
    historyId:{
        type: String,
        unique: true
    },
    details:{
        type: String
    },
    createdOn:{
        type: Date,
        default: time.now()
    }
    })
    
    mongoose.model('History', HistorySchema);