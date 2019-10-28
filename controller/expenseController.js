const mongoose = require('mongoose');
require('../models/Expense');
const expenseModel = mongoose.model('Expense');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const time = require('../libs/timeLib');
const shortid = require('shortid');

let createExpense = (req, res) => {
    
      expenseModel.findOne({ expId: req.body.expId }).exec((err, retrievedDetails) => {
          if (err) {
              logger.error(err.message, 'expenseController: expenseCreate()', 10);
              let apiResponse = response.generate(true, 'Failed to create expense', 500, null);
              res.send(apiResponse);
          }
          else if (check.isEmpty(retrievedDetails)) {
            
              let newExpense = new expenseModel({
                  expName: req.body.expName,
                  groupId: req.body.groupId,
                  expId: shortid.generate(),
                  payerName: req.body.payerName,
                  payerId: req.body.payerId,
                  amount: req.body.amount,
                  createdOn: time.now()
              })
              newExpense.save((err, result) => {
                  if (err) {
                      logger.error(err.message, 'expenseController: expenseCreate()', 10);
                      let apiResponse = response.generate(true, 'Failed to create expense', 500, null);
                      res.send(apiResponse);
                  }
                  else {
                      //let newGroupObj = result.toObject();
  
                      logger.info("expense created Successfully!!", 'expenseController: expenseCreate()', 10);
                      let apiResponse = response.generate(false, 'Expense created Successfully!!', 200, result);
                      res.send(apiResponse);
                  }
              })
          }
          else {
              logger.error('expense already present', 'expenseController: expenseCreate()', 10);
              let apiResponse = response.generate(true, 'Group already present', 500, null);
              res.send(apiResponse);
          }
      });
  
  }

  let getAllexpenses = (req, res) =>{
    expenseModel.find({'groupId': req.params.groupId})
.select('-__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
  if(err){
    logger.error('Failed to fetch all expense', 'expenseController: getAllexpenses()', 10)
    let apiResponse = response.generate(true, 'Failed to fetch expenses', 500, null)
    res.send(apiResponse);
  }
  else if(check.isEmpty(fetchedDetails)){
    logger.error('No expenses found', 'expenseController: getAllexpenses()', 10)
    let apiResponse = response.generate(true, 'NO expenses found', 404, null)
    res.send(apiResponse);
  }
  else{
    logger.info('Expenses found', 'expenseController: getAllexpenses()', 10)
    let apiResponse = response.generate(false, 'expenses Found!!!', 200, fetchedDetails)
    res.send(apiResponse);
  }
})
}

  module.exports = {
      createExpense: createExpense,
      getAllexpenses: getAllexpenses
  }

  
  