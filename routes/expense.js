
const expenseController = require('../controller/expenseController');


module.exports.setRouter = (app) =>{

    

    app.post( '/expenses/create', expenseController.createExpense);

    app.get( '/expenses/view/:groupId', expenseController.getAllexpenses);



}