const historyController = require('../controller/historyController');


module.exports.setRouter = (app) =>{

    

    app.post( '/history/create', historyController.createHistory);

    app.get( '/history/view', historyController.getAllHistory);

   
}