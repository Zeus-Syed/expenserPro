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
                  expAdder: req.body.expAdder,
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

let getSingleExpense = (req, res) =>{
  expenseModel.findOne({expId: req.params.expId})
.select('-__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
if(err){
  logger.error('Failed to fetch a expense', 'expenseController: getSingleExpense()', 10)
  let apiResponse = response.generate(true, 'Failed to fetch expense', 500, null)
  res.send(apiResponse);
}
else if(check.isEmpty(fetchedDetails)){
  logger.error('No expenses found', 'expenseController: getSingleExpense()', 10)
  let apiResponse = response.generate(true, 'NO expense found', 404, null)
  res.send(apiResponse);
}
else{
  logger.info('Expense found', 'expenseController: getSingleExpense()', 10)
  let apiResponse = response.generate(false, 'expense Found!!!', 200, fetchedDetails)
  res.send(apiResponse);
}
})
}

let deleteExpense = (req, res) => {
  expenseModel.remove({'expId':req.params.expId}).exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to delete expense', 'expenseController: deleteExpense()', 10)
      let apiResponse = response.generate(true, 'Failed to delete expense', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('NOT DELETED', 'expenseController: deleteExpense()', 10)
      let apiResponse = response.generate(true, 'NOT DELETED', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Deleted Successfully!!', 'expenseController: deleteExpense()', 10);
      let apiResponse = response.generate(false, 'Deleted Successfully!!', 200, fetchedDetails);
      apiResponse.createdOn = time.now();
      res.send(apiResponse);
    }
  })
}

let editExpense = (req, res) => {
  let options = req.body;
console.log(options);
expenseModel.update({'expId': req.params.expId}, options, {multi: true}).exec((err, result) => {
  if(err){
     
      logger.error(err.message, 'expenseController-->editExpense',7)
      let apiResponse = response.generate(true,"Failed to find expense details",500,null);
      res.send(apiResponse)
  }
  else if(check.isEmpty(result)){
        
         logger.info('NO EXPENSE FOUND','expenseController-->editExpense',5);
         let apiResponse = response.generate(true,"NO EXPENSE FOUND",404,null);
         res.send(apiResponse)
  }
  else {
     
      logger.info('EXPENSE EDITED SUCCESSSFULY!!','expenseController-->editExpense',5);
      let apiResponse = response.generate(false,"Expense EDITED!!!",200,result);
      res.send(apiResponse)
     }
})

}

  module.exports = {
      createExpense: createExpense,
      getAllexpenses: getAllexpenses,
      getSingleExpense: getSingleExpense,
      deleteExpense: deleteExpense,
      editExpense: editExpense
  }

  
  