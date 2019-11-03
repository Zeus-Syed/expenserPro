

const groupController = require('../controller/groupController');
const auth = require('../middlewares/AuthMiddle');

module.exports.setRouter = (app) =>{

    /**
     * @apiGroup group
     * @apiVersion  1.0.0
     * @api {post} /group/create api for group creation.
     *
     * @apiParam {string} groupName  name of the group. (body params) (required)
     * @apiParam {string} usersList users list of the group. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "group created Successfully!!",
            "status": 200,
            "data": {
                  createdOn: "2019-11-03T12:15:26.000Z"
                  groupId: "0VzXM73w"
                  groupName: "kaithodum"
                  userList: ["[{"userId":"cWh-_IUD","firstName":"ilaya"},{..}]"]
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To create group",
	    "status": 500,
	    "data": null
	   }
    */

    app.post('/group/create', groupController.groupCreate);

    /**
	 * @api {get} /group/view/all Get all groups
	 * @apiVersion 0.0.1
	 * @apiGroup group
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Groups Found!!",
	    "status": 200,
	    "data": 
				[	
                    {
						createdOn: "2019-10-19T09:01:30.000Z"
                        groupId: "C_iNPolW"
                        groupName: "12th grp"
                        userList: ["[{"userId":"z8twovUq","firstName":"Tong"},{"userId":"2A979AU","firstName":"Lee"}]"]
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find group Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get('/group/view/all', groupController.getAllGroups);

    /**
	 * @api {get} /group/view/:groupId Get single groups
	 * @apiVersion 0.0.1
	 * @apiGroup group
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Group Found!!",
	    "status": 200,
	    "data": 
					
                    {
						createdOn: "2019-10-19T09:01:30.000Z"
                        groupId: "C_iNPolW"
                        groupName: "12th grp"
                        userList: ["[{"userId":"z8twovUq","firstName":"Tong"},{"userId":"2A979AU","firstName":"Lee"}]"]
					}
	    		
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find group Details",
	    "status": 500,
	    "data": null
	   }
	 */
    
    app.get('/group/view/:groupId', groupController.getSingleGroup);

    /**
     * @apiGroup group
     * @apiVersion  1.0.0
     * @api {post} /group/delete/:groupId/:authToken api for group deletion.
     *
     * 
     * @apiParam {string} groupId unique ID of the group. (query params) (required)
     * @apiParam {string} authToken unique token for the group. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Group deleted successfully!!!",
            "status": 200,
            "data": {
               n: 1, ok: 1, deletedCount: 1
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To delete group",
	    "status": 500,
	    "data": null
	   }
    */

    app.post('/group/delete/:groupId/:authToken',auth.isAuthenticated, groupController.deleteGroup);


}