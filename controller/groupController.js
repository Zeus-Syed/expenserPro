const mongoose = require('mongoose');
require('../models/Group');
const groupModel = mongoose.model('Group');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');
const shortid = require('shortid');

let groupCreate = (req, res) => {
    groupModel.findOne({ groupName: req.body.groupName }).exec((err, retrievedDetails) => {
        if (err) {
            logger.error(err.message, 'GroupController: groupcreate', 10);
            let apiResponse = response.generate(true, 'Failed to create group', 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(retrievedDetails)) {
            

            let newGroup = new groupModel({
                groupName: req.body.groupName,
                groupId: shortid.generate(),
                userList: req.body.userList,
                createdOn: time.now()
            })
            newGroup.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'GroupController: groupcreate', 10);
                    let apiResponse = response.generate(true, 'Failed to create group', 500, null);
                    res.send(apiResponse);
                }
                else {
                    //let newGroupObj = result.toObject();

                    logger.info("Group created Successfully!!", 'GroupController: groupcreate', 10);
                    let apiResponse = response.generate(false, 'Group created Successfully!!', 200, result);
                    res.send(apiResponse);
                }
            })
        }
        else {
            logger.error('Group already present', 'GroupController: groupcreate', 10);
            let apiResponse = response.generate(true, 'Group already present', 500, null);
            res.send(apiResponse);
        }
    });

}

let getAllGroups = (req, res) =>{
    groupModel.find()
.select('-__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
  if(err){
    logger.error('Failed to fetch all GROUPS', 'groupController: getAllGroups()', 10)
    let apiResponse = response.generate(true, 'Failed to fetch groups', 500, null)
    res.send(apiResponse);
  }
  else if(check.isEmpty(fetchedDetails)){
    logger.error('No Users found', 'groupController: getAllGroups()', 10)
    let apiResponse = response.generate(true, 'NO Groups found', 404, null)
    res.send(apiResponse);
  }
  else{
    logger.info('Groups found', 'groupController: getAllGroups()', 10)
    let apiResponse = response.generate(false, 'Groups Found!!!', 200, fetchedDetails)
    res.send(apiResponse);
  }
})
}

let getSingleGroup = (req, res) =>{
    groupModel.findOne({'groupId':req.params.groupId})
    .select('-__v -_id')
    .lean()
    .exec((err, fetchedDetails)=>{
      if(err){
        logger.error('Failed to fetch a group', 'groupController: getSingleGroup()', 10)
        let apiResponse = response.generate(true, 'Failed to fetch a group', 500, null)
        res.send(apiResponse);
      }
      else if(check.isEmpty(fetchedDetails)){
        logger.error('No Group found', 'groupController: getSingleGroup()', 10)
        let apiResponse = response.generate(true, 'NO user found', 404, null)
        res.send(apiResponse);
      }
      else{
        logger.info('Group found!!', 'groupController: getSingleGroup()', 10);
        let apiResponse = response.generate(false, 'User Found!!!', 200, fetchedDetails);
        res.send(apiResponse);
      }
    })
  }

  let deleteGroup = (req, res) => {
    groupModel.remove({'groupId':req.params.groupId}).exec((err, fetchedDetails)=>{
      if(err){
        logger.error('Failed to delete group', 'groupController: deleteGroup()', 10)
        let apiResponse = response.generate(true, 'Failed to delete group', 500, null)
        res.send(apiResponse);
      }
      else if(check.isEmpty(fetchedDetails)){
        logger.error('NOT DELETED', 'groupController: deleteGroup()', 10)
        let apiResponse = response.generate(true, 'NOT DELETED', 404, null)
        res.send(apiResponse);
      }
      else{
        logger.info('Deleted Successfully!!', 'groupController: deleteGroup()', 10);
        let apiResponse = response.generate(false, 'Deleted Successfully!!', 200, fetchedDetails);
        res.send(apiResponse);
      }
    })
  }

module.exports = {
    groupCreate: groupCreate,
    getAllGroups:getAllGroups,
    getSingleGroup: getSingleGroup,
    deleteGroup: deleteGroup
}