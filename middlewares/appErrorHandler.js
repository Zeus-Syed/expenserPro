const response = require('./../libs/responseLib')

let errorHandler = (err, req, res, next) => {
    console.log("application error handler called")
    console.log(err)
    let apiResponse = response.generate(true,"Some error occured at global level",500,null);
         res.send(apiResponse)
    //res.send("Some error occured at global level")
}

let notFoundHandler = (req, res, next) => {
    console.log("Application route not found")
    let apiResponse = response.generate(true,"Route not found in the application",404,null);
         res.send(apiResponse)
    //res.status(404).send("Route not found");
}

module.exports= {
    globalErrorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}