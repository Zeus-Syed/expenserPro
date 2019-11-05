const historyController = require('../controller/historyController');


module.exports.setRouter = (app) =>{

/**
     * @apiGroup History
     * @apiVersion  1.0.0
     * @api {post} /history/create api for history creation.
     *
     * @apiParam {string} details  details of the history. (body params) (required)
     * @apiParam {string} createdOn  created data of the history. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "History created Successfully!!",
            "status": 200,
            "data": {
                  createdOn: "2019-11-02T12:56:30.000Z"
                  details: "Rocky added fresh in bigil"
                  historyId: "KOVf_RA6d"
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To create history",
	    "status": 500,
	    "data": null
	   }
    */    

    app.post( '/history/create', historyController.createHistory);

     /**
	 * @api {get} /history/:authToken/view Get all histories
	 * @apiVersion 0.0.1
	 * @apiGroup History
     *  @apiParam {string} authToken  token of the history. (query params) (required)
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Histories Found!!",
	    "status": 200,
		"data": 
		    {
				[	
                    {
						createdOn: "2019-11-02T12:56:30.000Z"
                        details: "Rocky added fresh in bigil"
                        historyId: "KOVf_RA6d"
					}
	    		]
	    	}
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find history Details",
	    "status": 500,
	    "data": null
	   }
	 */



    app.get( '/history/:authToken/view', historyController.getAllHistory);

   
}