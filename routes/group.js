

const groupController = require('../controller/groupController');


module.exports.setRouter = (app) =>{

    app.post('/group/create', groupController.groupCreate);

}