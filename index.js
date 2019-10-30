const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
mongoose.set('useCreateIndex', true);
//file include
const appConfig = require('./config/appConfig');
const routesPath = './routes';
const modelsPath = './models';
const logger = require('./libs/loggerLib');
const errorHandler = require('./middlewares/appErrorHandler');
const routeLoggerMiddle = require('./middlewares/routeLogger');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(errorHandler.globalErrorHandler);
app.use(routeLoggerMiddle.routeLogger);
//port listening
const server = http.createServer(app);
server.listen(appConfig.port);
server.on('error',onError);
server.on('listening', onListening);

const socketLib = require('./libs/socketLib');
socketLib.setServer(server);

function onError(error){
    if(error.syscall !== 'listen'){
        //console.log("some error");
        logger.error(error.code, 'not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }
    switch(error.code){
        case 'EACCES': 
       // console.log("some error");
        logger.error(error.code, 'not equal listen', 'serverOnErrorHandler', 10)
        process.exit(1)
        break
        case 'EADDRINUSE':
                logger.error(error.code, 'port is already in use', 'serverOnErrorHandler', 10)
                process.exit(1)
                break
                default: 
               logger.error(error.code, 'some error occurred', 'serverOnErrorHandler', 10)
                throw error
    }
}
//database connection
function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
    ('listening on' + bind)
    logger.info('server listening on port' + addr.port,  'serverOnListeningHandler', 10)
  // console.log("server listening on port "+ addr.port);
   let db = mongoose.connect(appConfig.db.url, { useNewUrlParser: true});
}

process.on('unhandledRejection', (reason, p)=>{
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Some error occured');
    }
});

mongoose.connection.on('open', (err)=>{
    if(err){
        console.log('DAtabase Error');
    }
    else{
        console.log("Database connection Succefull");
    }
});


app.get('/', (req, res)=>{
    console.log("Hello world");
    res.send("Got it!!!!");
})

//Accessing Routes
fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        console.log(routesPath+'/'+file)
        let route = require(routesPath+'/'+file)
        route.setRouter(app);
    }
});

fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js'))  {
    require(modelsPath+'/'+file)
   console.log(modelsPath+'/'+file);
    }
}) 

app.use(errorHandler.notFoundHandler);