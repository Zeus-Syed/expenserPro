const mailController = require('../controller/mailController');

module.exports.setRouter = (app) =>{


    app.post('/users/sendmail', mailController.sendingMail);
}