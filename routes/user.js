const userController = require('../controller/userController'); 
const auth = require('../middlewares/AuthMiddle');

module.exports.setRouter = (app) =>{

    let baseUrl = `/users`;

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /users/signup api for user account creation.
     *
     * @apiParam {string} firstname firstname of the user. (body params) (required)
     * @apiParam {string} lastname lastname of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} phoneCode phoneCode of the user. (body params) (required)
     * @apiParam {number} Mobile.no Mobile.no of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                countryCode: "91-India"
                createdOn: "2019-11-03T09:58:54.000Z"
                email: "bhumi@gmail.com"
                firstName: "bhumi"
                lastName: "naadan"
                phoneNo: 9614726712
                userId: "ge0Yu0M7"
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
    */

    app.post( `${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "countryCode": "91-India",
                "email": "person@mail.com",
                "firstName": "person",
                "lastName": "X",
                "phoneNumber": 9367232111,
                "userId": cWh-_IUD"
            }

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
    */


    app.post(`${baseUrl}/login`, userController.loginFunction);

    
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {put} /users/reset to reset user password.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "password reset Successfully",
            "status": 200,
            "data": null

        }
    */
    
    app.put(`${baseUrl}/reset`, userController.resetPassword);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
    */

    app.post(`${baseUrl}/logout/:authToken`, auth.isAuthenticated, userController.logOut);

      /**
	 * @api {get} users/view/all Get all users
	 * @apiVersion 0.0.1
	 * @apiGroup users
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Users Found!!",
	    "status": 200,
	    "data": [
					{
						createdOn: "2019-10-16T15:29:00.000Z"
                        email: "noob@gmail.com"
                        firstName: "noob"
                        lastName: "guy"
                        phoneNo: 9212145674
                        userId: "2A979Ms8"
					}
	    		]
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

    app.get( `${baseUrl}/view/all`, userController.getAllUsers);

    /**
	 * @api {get} users/:userId/details Get single user
	 * @apiVersion 0.0.1
	 * @apiGroup users
	 * @apiParam {string} userId userId of the user. (auth headers) (required)
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Found!!",
	    "status": 200,
	    "data": 
					{
						createdOn: "2019-10-16T15:29:00.000Z"
                        email: "noob@gmail.com"
                        firstName: "noob"
                        lastName: "guy"
                        phoneNo: 9212145674
                        userId: "2A979Ms8"
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

    app.get( `${baseUrl}/:userId/details`, userController.getSingleUser);

    /**
	 * @api {get} users/details/:email Get single user
	 * @apiVersion 0.0.1
	 * @apiGroup users
	 * @apiParam {string} email email of the user. (auth headers) (required)
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Found!!",
	    "status": 200,
	    "data": 
					{
						createdOn: "2019-10-16T15:29:00.000Z"
                        email: "noob@gmail.com"
                        firstName: "noob"
                        lastName: "guy"
                        phoneNo: 9212145674
                        userId: "2A979Ms8"
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

    app.get( `${baseUrl}/details/:email`, userController.getSingleUserByEmail);

    app.put( `${baseUrl}/:userId/edit`,auth.isAuthenticated, userController.editUser);

    app.post( `${baseUrl}/:userId/delete`,auth.isAuthenticated, userController.deleteUser);
}