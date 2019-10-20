

const groupController = require('../controller/groupController');


module.exports.setRouter = (app) =>{

    app.post('/group/create', groupController.groupCreate);

    app.get('/group/view/all', groupController.getAllGroups);
    
    app.get('/group/view/:groupId', groupController.getSingleGroup);

    app.post('/group/delete/:groupId', groupController.deleteGroup);


}