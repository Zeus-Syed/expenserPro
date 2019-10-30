const mongoose = require('mongoose');
const time = require('../libs/timeLib')
const Schema = mongoose.Schema;


const listSchema  = new Schema({
    userId: String,
    firstName: String
})

const GroupSchema = new Schema({
  groupName: {
      type: String
  } ,
  groupId: {
      type: String,
      unique: true
  },
  userList: [listSchema],

  createdOn: {
      type: Date,
      default: time.now()
  } 
})

mongoose.model('Group', GroupSchema);
mongoose.model('List', listSchema);