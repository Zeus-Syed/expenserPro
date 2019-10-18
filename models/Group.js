const mongoose = require('mongoose');
const time = require('../libs/timeLib')
const Schema = mongoose.Schema;


const GroupSchema = new Schema({
  groupName: {
      type: String
  } ,
  groupId: {
      type: String,
      unique: true
  },
  userList: {
      type: Array
  },
  createdOn: {
      type: Date,
      default: time.now()
  } 
})

mongoose.model('Group', GroupSchema);