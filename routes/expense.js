
const expenseController = require('../controller/expenseController');


module.exports.setRouter = (app) =>{

    

    app.post( '/expenses/create', expenseController.createExpense);

    app.get( '/expenses/view/:groupId', expenseController.getAllexpenses);

    app.get( '/expenses/single/:expId', expenseController.getSingleExpense);

    app.post( '/expenses/delete/:expId', expenseController.deleteExpense);

    app.put( '/expenses/edit/:expId', expenseController.editExpense);

}