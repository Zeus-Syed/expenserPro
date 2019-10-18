const mongoose = require('mongoose');
require('../models/Group');
const groupModel = mongoose.model('Group');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');

let groupCreate = (req, res) => {
    groupModel.findOne({ groupId: req.params.groupId }).exec((err, retrievedDetails) => {
        if (err) {
            logger.error(err.message, 'GroupController: groupcreate', 10);
            let apiResponse = response.generate(true, 'Failed to create group', 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(retrievedDetails)) {

            let newGroup = {
                groupName: req.body.groupName,
                groupId: req.params.groupId,
                userList: req.body.userList,
                createdOn: time.now()
            }
            newGroup.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'GroupController: groupcreate', 10);
                    let apiResponse = response.generate(true, 'Failed to create group', 500, null);
                    res.send(apiResponse);
                }
                else {
                    let newGroupObj = result.toObject();

                    logger.info("Group created Successfully!!", 'GroupController: groupcreate', 10);
                    let apiResponse = response.generate(false, 'Group created Successfully!!', 200, newGroupObj);
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
    
}


module.exports = {
    groupCreate: groupCreate
}