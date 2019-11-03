const mailController = require('../controller/mailController');

module.exports.setRouter = (app) =>{


/**
     * @apiGroup Mail
     * @apiVersion  1.0.0
     * @api {post} /users/sendmail api to send mail.
     *
     * @apiParam {string} from  Sender mail Id. (body params) (required)
     * @apiParam {string} to  Receipients. (body params) (required)
     * @apiParam {string} subject  subject of the mail. (body params) (required)
     * @apiParam {string} text  content of the mail. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         
             "Email sent250 2.0.0 OK  1572784121 65sm1595785pff.2 - gsmtp"  

         

        
    */    

    app.post('/users/sendmail', mailController.sendingMail);
}