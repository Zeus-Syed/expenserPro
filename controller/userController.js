const validateInput = require('../libs/paramsValidationLib');
const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const mongoose = require('mongoose');
require('../models/Auth');
require('../models/User');
const UserModel = mongoose.model('User')
const shortId = require('shortid');
const time = require('../libs/timeLib')
const token = require('../libs/tokenLib')
const passwordLib = require('../libs/generatePasswordLib')
const AuthModel = mongoose.model('Auth');

let resetPassword = (req, res)=>{

  /*UserModel.findOne({email:req.body.email})
  .select('-password -__v -_id')
  .lean()
  .exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('No Users found', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'NO user found', 404, null)
      res.send(apiResponse);
    }
    else{
     
     fetchedDetails.password = passwordLib.hashPassword(req.body.password);
     //fetchedDetails.markModified('password');
     fetchedDetails.visits.$inc();
     fetchedDetails.save((err, details)=>{
       if(err){
        logger.error('Failed to fetch all users', 'userController: getSingleUser()', 10)
        let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
        res.send(apiResponse);
       }
       else{
        logger.info('Users found', 'userController: getSingleUser()', 10);
        let apiResponse = response.generate(false, 'User Found!!!', 200, details);
        res.send(apiResponse);
       }
     }) 

      
    }
  })*/
   password = passwordLib.hashPassword(req.body.password);
console.log(typeof(password));
  let Option = {
    password
  }
  console.log(Option);
  UserModel.updateOne({email:req.body.email}, {$set: Option},{multi: true}).exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: editUser()', 10)
      let apiResponse = response.generate(true, 'Failed to edit users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.info('No Users found', 'userController: editUser()', 10)
      let apiResponse = response.generate(true, 'NO users found', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Users edited Succesfully', 'userController: editUser()', 10);
      let apiResponse = response.generate(false, 'Edited Successfully!!!', 200, fetchedDetails);
      res.send(apiResponse);
    }
  })

}

let signUpFunc = (req, res) => {

  let validateUserInput = () => {
    return new Promise((resolve, reject) => {

      if (req.body.email) {
        if (!validateInput.Email(req.body.email)) {
          let apiResponse = response.generate(true, 'Email does not meet the requiements', 403, null);
          reject(apiResponse);
        }
        else if (check.isEmpty(req.body.password)) {
          let apiResponse = response.generate(true, 'Password field is missing', 404, null);
          reject(apiResponse);
        }
        else {
          resolve(req);
        }

      }
      else {
        logger.error('Field Missing During Usercreation', 'userController: validateUserInput', 5);
        let apiResponse = response.generate(true, 'One or more Parameters Missing', 404, null);
        reject(apiResponse);
      }
    })

  } // end validateUserInput

  let createUser = () => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: req.body.email })
        .exec((err, retrievedUserDetails) => {
          if (err) {
            logger.error(err.message, 'userController: createUser', 10);
            let apiResponse = response.generate(true, 'Failed to create user', 500, null);
            reject(apiResponse);
          }
          else if (check.isEmpty(retrievedUserDetails)) {
            console.log(req.body)
            let newUser = new UserModel({
              userId: shortId.generate(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email.toLowerCase(),
              phoneNo: req.body.phoneNo,
              password: passwordLib.hashPassword(req.body.password),
              createdOn: time.now()
            })
            newUser.save((err, newUser) => {
              if (err) {
                console.log(err)
                logger.error(err.message, 'userController: createUser', 10);
                let apiResponse = response.generate(true, 'Failed to create new user', 403, null);
                reject(apiResponse);
              }
              else {
                let newUserObj = newUser.toObject();
                resolve(newUserObj)
              }
            }) //save
          }
          else {
            logger.error('User cannot be created, user already present', 'userController: createUser', 10);
            let apiResponse = response.generate(true, 'User already Present', 403, null);
            reject(apiResponse);
          }
        }) // exec



    }); // promise
  } // createUser
  validateUserInput(req, res)
    .then(createUser)
    .then((resolve) => {
      delete resolve.password
      let apiResponse = response.generate(false, 'User Created', 200, resolve);
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })

}

let loginFunc = (req, res) => {

  let findUser = (req, res) => {
    console.log("findUser");
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        console.log('parameter entered');
        UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
          if (err) {
            logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
            let apiResponse = response.generate(true, 'Failed To Retrieve User Data', 500, null);
            reject(apiResponse);
          }
          else if (check.isEmpty(userDetails)) {
            logger.error('No User Found', 'userController: findUser()', 7)
            let apiResponse = response.generate(true, 'No User Found',404 , null);
            reject(apiResponse);
          }
          else {
            logger.info('User Found', 'userController: findUser()', 10)
            resolve(userDetails);
          }
        }) // findOne
      }
      else {
        let apiResponse = response.generate(true,'Email is missing', 404, null);
        reject(apiResponse);
      }
    }); //promise

  } // findUser


  let validatePassword = (retrievedUserDetails) => {
    console.log("ValidatePAssword");
 // console.log(retrievedUserDetails);
    return new Promise((resolve, reject) => {
      passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
        if (err) {
          logger.error(err.message, 'userController: validatePassword()', 10)
          let apiResponse = response.generate(true, 'Some error while comparing password', 404, null);
          reject(apiResponse);
        }
        else if (isMatch) {
          let retObj = retrievedUserDetails.toObject();
          delete retObj.password
          delete retObj.__v
          delete retObj._id
          delete retObj.createdOn
          delete retObj.modifiedOn
          resolve(retObj);
        }
        else {
          logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
          let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
          reject(apiResponse)
        }
      }) //comparePassword
    }) // promise
  } // validatePassword

  let generateToken = (userDetails) => {
    console.log('generate Token')
    return new Promise((resolve, reject) => {
      token.generateToken(userDetails, (err, tokenDetails) => {
        if (err) {
          logger.error('Failed to generate token', 'userController: generateToken()', 10)
          let apiResponse = response.generate(true, 'failed to fetch token', 500, null)
          reject(apiResponse)
        }
        else {
          tokenDetails.userId = userDetails.userId
          tokenDetails.userDetails = userDetails
          resolve(tokenDetails);
        }
      })
    })
  } //generate Token

  let save = (tokenDetails) => {
    console.log('Save token');
    return new Promise((resolve, reject) => {
      AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedUserDetails) => {
        if (err) {
          logger.error('Failed to save token', 'userController: save()', 10)
          let apiResponse = response.generate(true, 'failed to find the fetched auth records', 500, null)
          reject(apiResponse)
        }
        else if (check.isEmpty(retrievedUserDetails)) {
          let newToken = new AuthModel({
            userId: tokenDetails.userId,
            authToken: tokenDetails.token,
            tokenSecret: tokenDetails.tokenSecret,
            tokenGenerateTime: time.now()
          })
          newToken.save((err, retrievedNewTokenDetails) => {
            if (err) {
              logger.error('Failed to save new token', 'userController: save()', 10)
              let apiResponse = response.generate(true, 'Failed to save auth record', 500, null)
              reject(apiResponse)
            }
            else {
              let tokenRes = {
                authToken: retrievedNewTokenDetails.authToken,
                userDetails: tokenDetails.userDetails
              }
              resolve(tokenRes);
            }
          })
        }
        else {
          retrievedUserDetails.authToken = tokenDetails.token,
            retrievedUserDetails.tokenSecret = tokenDetails.tokenSecret,
            retrievedUserDetails.tokenGenerateTime = time.now()
            retrievedUserDetails.save((err, retrievedNewTokenDetails)=>{
              if (err) {
                logger.error('Failed to save new token', 'userController: save()', 10)
                let apiResponse = response.generate(true, 'Failed to fetch auth records', 500, null)
                reject(apiResponse)
              }
              else{
                let tokenRes = {
                  authToken: retrievedNewTokenDetails.authToken,
                  userDetails: tokenDetails.userDetails
                }
                resolve(tokenRes);
              }
            })
         }
      }) // auth findOne
    }) // PRomise
  }

  findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(save)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
      res.status(200)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log("errorhandler");
      console.log(err);
      res.status(err.status)
      res.send(err)
    })

} //loginFunc

let getAllUsers = (req, res) =>{
UserModel.find()
.select('-password -__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
  if(err){
    logger.error('Failed to fetch all users', 'userController: getAllUsers()', 10)
    let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
    res.send(apiResponse);
  }
  else if(check.isEmpty(fetchedDetails)){
    logger.error('No Users found', 'userController: getAllUsers()', 10)
    let apiResponse = response.generate(true, 'NO users found', 404, null)
    res.send(apiResponse);
  }
  else{
    logger.info('Users found', 'userController: getAllUsers()', 10)
    let apiResponse = response.generate(false, 'Users Found!!!', 200, fetchedDetails)
    res.send(apiResponse);
  }
})
}

let getSingleUser = (req, res) =>{
  UserModel.findOne({'userId':req.params.userId})
  .select('-password -__v -_id')
  .lean()
  .exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('No Users found', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'NO user found', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Users found', 'userController: getSingleUser()', 10);
      let apiResponse = response.generate(false, 'User Found!!!', 200, fetchedDetails);
      res.send(apiResponse);
    }
  })
}

let getSingleUserByEmail = (req, res) =>{
  UserModel.findOne({'email':req.params.email})
  .select('-password -__v -_id')
  .lean()
  .exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('No Users found', 'userController: getSingleUser()', 10)
      let apiResponse = response.generate(true, 'NO user found', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Users found', 'userController: getSingleUser()', 10);
      let apiResponse = response.generate(false, 'User Found!!!', 200, fetchedDetails);
      res.send(apiResponse);
    }
  })
}

let editUser = (req, res) =>{
  let Option = req.body;
  UserModel.update({'userId':req.params.userId}, Option).exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: editUser()', 10)
      let apiResponse = response.generate(true, 'Failed to edit users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.info('No Users found', 'userController: editUser()', 10)
      let apiResponse = response.generate(true, 'NO users found', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Users edited Succesfully', 'userController: editUser()', 10);
      let apiResponse = response.generate(false, 'Edited Successfully!!!', 200, fetchedDetails);
      res.send(apiResponse);
    }
  })
}

let deleteUser = (req, res) => {
  UserModel.remove({'userId':req.params.userId}).exec((err, fetchedDetails)=>{
    if(err){
      logger.error('Failed to fetch all users', 'userController: deleteUser()', 10)
      let apiResponse = response.generate(true, 'Failed to fetch users', 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('No Users found', 'userController: deleteUser()', 10)
      let apiResponse = response.generate(true, 'NO users found', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('Users found', 'userController: deleteUser()', 10);
      let apiResponse = response.generate(false, 'User deleted successfully', 404, fetchedDetails);
      res.send(apiResponse);
    }
  })
}

let logOut = (req, res) => {
  AuthModel.remove({userId:req.user.userId}).exec((err, fetchedDetails)=>{
    if(err){
      logger.error(err.message, 'userController: logout()', 10)
      let apiResponse = response.generate(true, `error: ${err.message} `, 500, null)
      res.send(apiResponse);
    }
    else if(check.isEmpty(fetchedDetails)){
      logger.error('Already logged out', 'userController: logout()', 10)
      let apiResponse = response.generate(true, 'Already logged out or Invalid UserId', 404, null)
      res.send(apiResponse);
    }
    else{
      logger.info('logged out Successfully!!', 'userController: logout()', 10);
      let apiResponse = response.generate(false, 'Logged out successfully!!', 200, fetchedDetails);
      res.send(apiResponse);
    }
  })
}

module.exports = {
  signUpFunction: signUpFunc,
  loginFunction: loginFunc,
  logOut: logOut,
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  editUser: editUser,
  deleteUser: deleteUser,
  getSingleUserByEmail: getSingleUserByEmail,
  resetPassword: resetPassword
}