const mongoose = require('mongoose');
require('../models/History');
const historyModel = mongoose.model('History');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');
const shortid = require('shortid');

let createHistory = (req, res) =>{
        let newHistory = new historyModel({
           
            historyId: shortid.generate(),
            details: req.body.details,
            createdOn: req.body.createdOn
        })
        newHistory.save((err, result) => {
            if (err) {
                logger.error(err.message, 'historyController: createHistory', 10);
                let apiResponse = response.generate(true, 'Failed to create history', 500, null);
                res.send(apiResponse);
            }
            else {

                logger.info("history created Successfully!!", 'historyController: createHistory', 10);
                let apiResponse = response.generate(false, 'history created Successfully!!', 200, result);
                res.send(apiResponse);
            }
        })
    


}

let getAllHistory = (req, res) =>{
    historyModel.find()
.select('-__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
  if(err){
    logger.error('Failed to fetch all histories', 'historyController: getAllHistory()', 10)
    let apiResponse = response.generate(true, 'Failed to fetch histories', 500, null)
    res.send(apiResponse);
  }
  else if(check.isEmpty(fetchedDetails)){
    logger.error('No histories found', 'historyController: getAllHistory()', 10)
    let apiResponse = response.generate(true, 'NO histories found', 404, null)
    res.send(apiResponse);
  }
  else{
    logger.info('Histories found', 'historyController: getAllHistory()', 10)
    let apiResponse = response.generate(false, 'Histories Found!!!', 200, fetchedDetails)
    res.send(apiResponse);
  }
})
}

module.exports = {
    createHistory: createHistory,
    getAllHistory: getAllHistory
}