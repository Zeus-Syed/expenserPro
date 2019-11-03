
const expenseController = require('../controller/expenseController');
const auth = require('../middlewares/AuthMiddle');

module.exports.setRouter = (app) =>{

    /**
     * @apiGroup expense
     * @apiVersion  1.0.0
     * @api {post} /expenses/create api for expense creation.
     *
     * @apiParam {string} expName  name of the expense. (body params) (required)
     * @apiParam {number} amount total amount of the expense. (body params) (required)
     * @apiParam {string} payerName Payer of the expense. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Expense created Successfully!!",
            "status": 200,
            "data": {
               amount: 100
               createdOn: "2019-11-03T10:37:47.000Z"
               expAdder: "person"
               expId: "7O7VO8vS"
               expName: "red"
               groupId: "XLRe34e-"
               payerId: "vq2Vz-WJ"
               payerName: "person"
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To create expense",
	    "status": 500,
	    "data": null
	   }
    */

    app.post( '/expenses/create', expenseController.createExpense);

    /**
	 * @api {get} /expenses/view/:groupId Get all expense
	 * @apiVersion 0.0.1
	 * @apiGroup expense
	 * @apiParam {string} groupId groupId of the expense. (query parameter) (required)
	 *  @apiSuccessExample {json} Success-Response:
	 * {
	    "error": false,
	    "message": "expense Found!!",
	    "status": 200,
       "data": 
         {
				[	
               {
						      amount: 600
                        createdOn: "2019-10-31T16:08:48.000Z"
                        expAdder: "person"
                        expId: "Xk5FMS7A"
                        expName: "flop"
                        groupId: "XLRe34e-"
                        payerId: "vq2Vz-WJ"
                        payerName: "person"
					}
	    		]
         }
      } 
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get( '/expenses/view/:groupId', expenseController.getAllexpenses);

    /**
	 * @api {get} /expenses/single/:expId Get single expense
	 * @apiVersion 0.0.1
	 * @apiGroup expense
	 * @apiParam {string} expID unique ID of the expense. (query parameter) (required)
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "expense Found!!",
	    "status": 200,
	    "data": 
					{
						      amount: 600
                        createdOn: "2019-10-31T16:08:48.000Z"
                        expAdder: "person"
                        expId: "Xk5FMS7A"
                        expName: "flop"
                        groupId: "XLRe34e-"
                        payerId: "vq2Vz-WJ"
                        payerName: "person"
					}
	    		
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get( '/expenses/single/:expId', expenseController.getSingleExpense);

    /**
     * @apiGroup expense
     * @apiVersion  1.0.0
     * @api {post} /expenses/delete/:expId api for expense deletion.
     *
     * 
     * @apiParam {string} expId unique ID of the expense. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Expense deleted successfully!!!",
            "status": 200,
            "data": {
               n: 1, ok: 1, deletedCount: 1
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To delete expense",
	    "status": 500,
	    "data": null
	   }
    */


    app.post( '/expenses/delete/:expId', expenseController.deleteExpense);

    /**
     * @apiGroup expense
     * @apiVersion  1.0.0
     * @api {put} /expenses/edit/:expId api for expense updation.
     *
     * @apiParam {string} expName  name of the expense. (body params) (required)
     * @apiParam {number} amount total amount of the expense. (body params) (required)
     * @apiParam {string} payerName Payer of the expense. (body params) (required)
     * @apiParam {string} expId unique ID of the expense. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Expense EDITED!!!",
            "status": 200,
            "data": {
               n: 1, nModified: 1, ok: 1
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To edit expense",
	    "status": 500,
	    "data": null
	   }
    */

    app.put( '/expenses/edit/:expId', expenseController.editExpense);

}